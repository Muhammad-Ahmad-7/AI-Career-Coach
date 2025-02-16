"use server";
import { db } from "@/lib/query.prisma";
import { auth } from "@clerk/nextjs/server"
import { generateAiIndustryInsights } from "./dashboard.api";

export const updateUser = async (data) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User not exist");

    try {
        const result = await db.$transaction(
            async (tx) => {
                //find if the industry exists
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry,
                    }
                })
                // If industry does not exist, create it with the default values - will replace it with Ai later

                if (!industryInsight) {
                    const insights = await generateAiIndustryInsights(user.industry);
                    industryInsight = await db.industryInsight.create({
                        data: {
                            industry: data.industry,
                            ...insights,
                            nextUpdated: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
                        }
                    })
                }

                // update the user

                const updatedUser = await tx.user.update({
                    where: {
                        clerkUserId: userId,
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills
                    },
                });
                return { updatedUser, industryInsight };
            },
            {
                timeout: 10000, // default:5000
            }
        )
        return { success: true, ...result };
    } catch (error) {
        console.error("Error Updating user and industry", error.message);
    }
}

export const getUserOnboardingStatus = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User not exist");
    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
            select: {
                industry: true
            },
        })
        return {
            isOnboarded: !!user?.industry,
        }
    } catch (error) {
        console.error("Error checking onboarding status: ", error.message);
        throw new Error("Failed to check onboarding status");
    }
}