'use server'
import { db } from "@/lib/query.prisma";
import { auth } from "@clerk/nextjs/server"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({
    "model": "gemini-1.5-flash",
})

export const saveResume = async (content) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })

    if (!user) throw new Error("User not exist");

    try {
        const resume = await db.resume.upsert({
            where: {
                userId: user.id,
            },
            update: {
                content,
            },
            create: {
                userId: user.id,
                content,
            }
        })
        revalidatePath('/resume');
        return resume;
    } catch (error) {
        console.log("Error in saving the resume", error.message);
        throw new Error("Failed to save resume");
    }
}

export const getResume = async () => {
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

    try {
        return await db.Resume.findUnique({
            where: {
                userId: user.id
            },
        });
    } catch (error) {
        console.log("Error in Get resume", error.message);
        throw new Error("Failed to get resume");
    }
}

export const improveWithAI = async ({ current, type }) => {
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

    const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const improvedContent = response.text().trim();
        return improvedContent;
    } catch (error) {
        console.log("Error in improving the resume content", error.message);
        throw new Error("Failed to improve the resume");
    }
}