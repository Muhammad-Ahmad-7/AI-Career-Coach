'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Trophy } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import QuizResult from './QuizResult'


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

const RecentQuiz = ({ assessments }) => {
    const [assessment, setAssessment] = useState(null);
    return (
        <div>
            <Card className='w-full mt-10'>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-white gradient-title text-4xl'>Recent Quizzes</h1>
                            <p className='text-sm text-gray-500' >Review your past quiz performance</p>
                        </div>
                        <Button>
                            <Link href={'/interview/mock'}>
                                Start New Quiz
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {assessments?.map((item, index) => (
                        <Card className='w-full my-5 hover:bg-muted/50 transition-colors cursor-pointer' key={index} onClick={() => setAssessment(item)}>
                            <CardHeader>
                                <CardDescription className=''>
                                    <h1 className='text-white'>Quiz {index + 1}</h1>
                                    <p className='text-sm text-gray-500' >Score {item.quizScore.toFixed(1)}%</p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className='text-sm text-gray-500' >{item.improvementTips}</p>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
                <Dialog open={!!assessment} onOpenChange={() => setAssessment(null)}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                            </DialogTitle>
                        </DialogHeader>
                        <QuizResult
                            result={assessment}
                            hideStartNew
                            onStartNew={() => router.push("/interview/mock")}
                        />
                    </DialogContent>
                </Dialog>
            </Card>
        </div>
    )
}

export default RecentQuiz
