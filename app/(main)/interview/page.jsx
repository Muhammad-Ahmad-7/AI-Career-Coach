import { generateAiQuiz, getAssessments } from '@/actions/interview.api'
import React from 'react'
import StatsCard from './_components/StatsCard'
import PerformanceCard from './_components/PerformanceCard'
import RecentQuiz from './_components/RecentQuiz'

const page = async () => {
    const assessments = await getAssessments();
    return (
        <div>
            <div>
                <h1 className='text-5xl gradient-title mb-4' >Interview Preparation</h1>
            </div>
            <div>
                <StatsCard assessments={assessments} />
                <PerformanceCard assessments={assessments} />
                <RecentQuiz assessments={assessments} />
            </div>
        </div>
    )
}

export default page
