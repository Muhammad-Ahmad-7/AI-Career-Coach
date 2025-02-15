'use client'
import { Briefcase, Dot, LineChart, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

/*
insights {
  id: 'cm71i8eb10006ujr8375o565e',
  industry: 'tech-software-development',
  salaryRanges: [
    {
      max: 150000,
      min: 80000,
      role: 'Software Engineer',
      median: 115000,
      location: 'US'
    },
    {
      max: 160000,
      min: 90000,
      role: 'Data Scientist',
      median: 125000,
      location: 'US'
    },
    {
      max: 130000,
      min: 70000,
      role: 'Project Manager',
      median: 100000,
      location: 'US'
    },
    {
      max: 140000,
      min: 75000,
      role: 'UX Designer',
      median: 105000,
      location: 'US'
    },
    {
      max: 140000,
      min: 70000,
      role: 'Cybersecurity Analyst',
      median: 100000,
      location: 'US'
    },
    {
      max: 170000,
      min: 95000,
      role: 'DevOps Engineer',
      median: 130000,
      location: 'US'
    }
  ],
  growthRate: 7.5,
  demandLevel: 'HIGH',
  topSkills: [
    'Cloud Computing',
    'Artificial Intelligence',
    'Data Analysis',
    'Cybersecurity',
    'Agile Methodologies'
  ],
  marketOutlook: 'POSITIVE',
  keyTrends: [
    'Remote Work',
    'Automation',
    'AI-driven solutions',
    'Cloud Migration',
    'Cybersecurity Threats'
  ],
  recommendedSkills: [ 'Python', 'AWS', 'Machine Learning', 'SQL', 'Communication' ],
  lastUpdated: 2025-02-12T06:02:57.518Z,
  nextUpdated: 2025-02-19T06:02:57.513Z
}
*/

const DashboardView = ({ insights }) => {

    const salaryData = insights.salaryRanges.map((range) => ({
        name: range.role,
        min: range.min / 1000,
        max: range.max / 1000,
        median: range.median / 1000,
    }));
    console.log(salaryData)

    const getDemandLevelColor = (level) => {
        switch (level.toLowerCase()) {
            case "high":
                return "bg-green-500";
            case "medium":
                return "bg-yellow-500";
            case "low":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    }

    const getMarketOutlookInfo = (outlook) => {
        switch (outlook.toLowerCase()) {
            case "positive":
                return { icon: TrendingUp, color: "text-green-500" };
            case "neutral":
                return { icon: LineChart, color: "text-yellow-500" };
            case "negative":
                return { icon: TrendingDown, color: "text-red-500" };
            default:
                return { icon: LineChart, color: "text-gray-500" };
        }
    }

    const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
    const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

    const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");

    const nextUpdateDistance = formatDistanceToNow(new Date(insights.nextUpdated), { addSuffix: true });

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
            </div>
            <div className='flex gap-2 flex-wrap items-center justify-between max-md:flex-col'>
                <Card className='w-[24%] max-md:w-full h-[200px]'>
                    <CardHeader>
                        <CardDescription className='flex justify-between items-center'>
                            <p className='text-white'>Market Outlook</p>
                            {<OutlookIcon className={`${outlookColor}`} />}
                        </CardDescription>
                        <CardTitle>{insights.marketOutlook}</CardTitle>
                        <p className='text-gray-400'>Next Updated {nextUpdateDistance}</p>
                    </CardHeader>
                </Card>
                <Card className='w-[24%] max-md:w-full h-[200px]'>
                    <CardHeader>
                        <CardDescription className='flex justify-between items-center'>
                            <p className='text-white'>Industry Growth</p>
                        </CardDescription>
                        <CardTitle>{
                            insights.growthRate.toFixed(1)
                        }%</CardTitle>
                        <Progress value={insights.growthRate.toFixed(1)} className='mt-3' />
                    </CardHeader>
                </Card>
                <Card className='w-[24%] max-md:w-full h-[200px]'>
                    <CardHeader>
                        <CardDescription className='flex justify-between items-center'>
                            <p className='text-white'>Demand Level</p>
                            <Briefcase />
                        </CardDescription>
                        <CardTitle>{insights.demandLevel}</CardTitle>
                        <div className={`w-full h-4 rounded-full ${getDemandLevelColor(insights.demandLevel)}`}>
                        </div>
                    </CardHeader>
                </Card>
                <Card className='w-[24%] max-md:w-full h-[200px]'>
                    <CardHeader>
                        <CardDescription className='flex justify-between items-center'>
                            <p className='text-white'>Top Skills</p>
                        </CardDescription>
                    </CardHeader>
                    {
                        insights.topSkills.map((skill, idx) => (
                            <Badge key={idx} className={'rounded-md bg-gray-800 text-white m-2'}>{skill}</Badge>
                        ))
                    }
                </Card>
            </div>
            <div>
                <Card className='w-full'>
                    <CardHeader>
                        <CardDescription className=''>
                            <p className='text-white'>Salary Ranges by Role</p>
                            <p className='text-gray-400'>Displaying minimum, median, and maximum salaries (in thousands)</p>
                        </CardDescription>
                    </CardHeader>
                    <div className='h-[400px]'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={salaryData}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-background border rounded-lg p-2 shadow-md">
                                                <p className="font-medium">{label}</p>
                                                {payload.map((item) => (
                                                    <p key={item.name} className="text-sm">
                                                        {item.name}: ${item.value}K
                                                    </p>
                                                ))}
                                            </div>
                                        )
                                    }
                                }} />
                                <Legend />
                                <Bar dataKey="min" fill='#94a3b8' name='Min Salary (K)' />
                                <Bar dataKey="median" fill='#64748b' name='Median Salary (K)' />
                                <Bar dataKey="max" fill='#475569' name='Max Salary (K)' />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
            <div className='flex gap-2 justify-between'>
                <div className='w-[49%]'>
                    <Card className='w-full h-[400px]'>
                        <CardHeader>
                            <CardDescription className='flex justify-between items-center'>
                                <p className='text-white text-xl'>Key industry trends</p>
                            </CardDescription>
                            <p className='text-gray-400'>Current Trends Shaping the industry</p>
                        </CardHeader>
                        <div className='p-5'>
                            {
                                insights.keyTrends.map((trend) => {
                                    return (
                                        <div className='my-2 flex items-center' key={trend}>
                                            <Dot size={40} />{trend}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Card>
                </div>
                <div className='w-[49%]'>
                    <Card className='w-full h-[400px]'>
                        <CardHeader>
                            <CardDescription className='flex justify-between items-center'>
                                <p className='text-white text-xl'>Recommended Skills</p>
                            </CardDescription>
                            <p className='text-gray-400'>Skills to consider developing</p>
                        </CardHeader>
                        <div className='p-5 flex gap-3'>
                            {
                                insights.recommendedSkills.map((skill) => {
                                    return (
                                        <Badge className='my-2 flex items-center bg-black text-white rounded-sm h-10 border-[0.5px] border-gray-400' key={skill}>
                                            {skill}
                                        </Badge>
                                    )
                                })
                            }
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DashboardView
