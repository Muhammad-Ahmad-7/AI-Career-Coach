import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Target, Trophy } from 'lucide-react';
import React from 'react'

/*
assessments:   [
  {
    id: '4d75dc8d-9584-4e40-9e5f-adb95db3a720',
    userId: 'e81bd402-86a0-4af7-bcbf-03f293583c12',
    quizScore: 70,
    questions: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ],
    category: 'Technical',
    improvementTips: "Focus on solidifying your understanding of JavaScript fundamentals, particularly the `this` keyword and primitive data types, and explore React's core lifecycle methods and hooks like `useEffect`.  You're well on your way to mastering these concepts!",
    createdAt: 2025-02-16T08:38:18.163Z,
    updatedAt: 2025-02-16T08:38:18.163Z
  },
  {
    id: '8f91f51a-e210-49d3-8417-d8edb055a413',
    userId: 'e81bd402-86a0-4af7-bcbf-03f293583c12',
    quizScore: 60,
    questions: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ],
    category: 'Technical',
    improvementTips: "Focus on mastering JavaScript variable scoping rules and the nuances of the `this` keyword, and review the various ways to iterate through Python dictionaries and manage state in React Native.  You've got this!",
    createdAt: 2025-02-16T11:51:53.905Z,
    updatedAt: 2025-02-16T11:51:53.905Z
  }
]
*/

const StatsCard = ({ assessments }) => {
    const calAvgScore = () => {
        if (assessments.length == 0) {
            return 0;
        }
        let avgScore = 0;
        let sum = 0;
        assessments.forEach(element => {
            sum += element.quizScore;
        });
        avgScore = sum / assessments.length;
        return avgScore;
    }
    const getLatestAssessment = () => {
        if (assessments.length == 0) {
            return 0;
        }
        return assessments[0].quizScore;
    }
    return (
        <div className='flex justify-between max-md:flex-col'>
            <Card className='w-[33%] max-md:w-full'>
                <CardHeader>
                    <CardDescription className='flex justify-between items-center'>
                        <h1 className='text-white'>Average Score</h1>
                        <Trophy className='w-4 h-4' />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <h1 className='text-2xl font-bold'>{calAvgScore()}%</h1>
                    <p className='text-sm text-gray-500' >Across all assessments</p>
                </CardContent>
            </Card>
            <Card className='w-[33%] max-md:w-full'>
                <CardHeader>
                    <CardDescription className='flex justify-between items-center'>
                        <h1 className='text-white'>Questions Practiced</h1>
                        <Brain className='w-4 h-4' />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <h1 className='text-2xl font-bold'>{assessments?.length * 10}</h1>
                    <p className='text-sm text-gray-500' >Total questions</p>
                </CardContent>
            </Card>
            <Card className='w-[33%] max-md:w-full'>
                <CardHeader>
                    <CardDescription className='flex justify-between items-center'>
                        <h1 className='text-white'>Latest Score</h1>
                        <Target className='w-4 h-4' />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <h1 className='text-2xl font-bold'>{getLatestAssessment()}%</h1>
                    <p className='text-sm text-gray-500' >Most recent quiz</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default StatsCard
