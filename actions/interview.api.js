'use server'
import { db } from "@/lib/query.prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({
    "model": "gemini-1.5-flash",
})

export const generateAiQuiz = async () => {

    // Check user authenticated
    // Get User industry
    // Make gemini api call to fetch the questions

    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User not exist");

    const prompt = `
        Generate 10 technical interview questions for a ${user.industry
        } professional${user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
        }.
        
            Each question should be multiple choice with 4 options.
            
        Return the response in this JSON format only, no additional text:
        {
            "questions": [
                {
                "question": "string",
                "options": ["string", "string", "string", "string"],
                "correctAnswer": "string",
                "explanation": "string"
                }
            ]
        }
    `;

    try {

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
        const quiz = JSON.parse(cleanedText);
        return quiz.questions;

    } catch (error) {
        console.log("Error in Generating AI quiz", error.message);
        throw new Error(error.message);
    }
}

export const saveQuizResult = async (questions, answers, score) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User not exist");

    const questionResult = questions.map((q, index) => ({
        question: q.question,
        answer: q.correctAnswer,
        userAnswer: answers[index],
        isCorrect: q.correctAnswer === answers[index],
        explanation: q.explanation
    }))

    const wrongAnswers = questionResult.filter((q) => !q.isCorrect);
    let improvementTip = null;

    if (wrongAnswers.length > 0) {
        const wrongQuestionsText = wrongAnswers.map((q) =>
            `Questions: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
        ).join("\n\n");
        const improvementPrompt = `
            The user got the following ${user.industry} technical interview questions wrong:
    
            ${wrongQuestionsText}
    
            Based on these mistakes, provide a concise, specific improvement tip.
            Focus on the knowledge gaps revealed by these wrong answers.
            Keep the response under 2 sentences and make it encouraging.
            Don't explicitly mention the mistakes, instead focus on what to learn/practice.
        `;
        try {

            const result = await model.generateContent(improvementPrompt);
            const response = result.response;
            improvementTip = response.text().trim();
    
        } catch (error) {
            console.log("Error in Generating Improvement tip", error.message);
        }
    }


    try {
        const assessment = await db.Assessment.create({
            data: {
                userId: user.id,
                quizScore: score,
                questions: questionResult,
                category: 'Technical',
                improvementTips: improvementTip
            }
        });
        return assessment;
    } catch (error) {
        console.log("Error in Storing Assessment DATA", error.message);
        throw new Error(error.message);
    }
}