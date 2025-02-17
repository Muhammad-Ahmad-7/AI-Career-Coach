'use client'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

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


const PerformanceCard = ({ assessments }) => {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        if (assessments) {
            const formattedData = assessments.map((assessment) => ({
                date: format(new Date(assessment.createdAt), "MMM dd"),
                score: assessment.quizScore,
            }));
            setChartData(formattedData);
        }
    }, [assessments]);

    return (
        <div>
            <Card className='w-full mt-8'>
                <CardHeader>
                    <CardDescription className='flex justify-between items-center flex-col'>
                        <h1 className='text-5xl gradient-title' >Performance Trend</h1>
                        <p className='text-sm text-gray-500' >Your quiz scores over time</p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='h-[300px]'>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip content={({ active, payload }) => {
                                    if (active && payload?.length) {
                                        return (
                                            <div className="bg-background border rounded-lg p-2 shadow-md">
                                                <p className="text-sm font-medium">
                                                    Score: {payload[0].value}%
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {payload[0].payload.date}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }} />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PerformanceCard
