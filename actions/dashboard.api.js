import { db } from "@/lib/query.prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({
    "model": "gemini-1.5-flash",
})

export const generateAiIndustryInsights = async (industry) => {
    const prompt = `
        Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
        {
            "salaryRanges": [
            { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "HIGH" | "MEDIUM" | "LOW",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
        }
        
        IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
        Include at least 5 common roles for salary ranges.
        Growth rate should be a percentage.
        Include at least 5 skills and trends.
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log("TEXT:: ", text);
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
        console.log("CLEANED TEXT:: ", cleanedText);
        return JSON.parse(cleanedText);
}

export async function getIndustryInsights() {

    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        },
        include: {
            industryInsight: true
        }
    })

    if (!user) throw new Error("User not exist");

    if (!user.industryInsight) {
        const insights = await generateAiIndustryInsights(user.industry);
        const industryInsight = db.industryInsight.create({
            data: {
                industry: user.industry,
                ...insights,
                nextUpdated: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
            }
        })
        return industryInsight;
    }
    return user.industryInsight
}