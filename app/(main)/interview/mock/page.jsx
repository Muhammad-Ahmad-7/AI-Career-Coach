import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Quiz from '../_components/Quiz'

const MockInterviewPage = () => {
    return (
        <div className='flex flex-col gap-2'>
            <div>
                <Link href={'/interview'} className='flex items-center gap-2'>
                    <ArrowLeft className='h-4 w-4' />
                    <p className='hover:border-b-[1.1px] border-white' >Back to interview Preparation</p>
                </Link>
            </div>
            <div className='flex items-center justify-between mt-2'>
                <h1 className='text-7xl font-bold gradient-title'>
                    Mock Interview
                </h1>
            </div>
            <p className='text-gray-500'>Test your knowledge with industry-specific questions</p>
            <div>
                <Quiz/>
            </div>
        </div>
    )
}

export default MockInterviewPage
