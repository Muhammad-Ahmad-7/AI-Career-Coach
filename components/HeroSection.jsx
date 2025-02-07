import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Github, Star } from 'lucide-react'

const HeroSection = () => {
    return (
        <section className='flex justify-center items-center min-h-screen'>
            <div className='flex justify-center items-center flex-col gap-5'>
                <h1 className='text-4xl md:text-6xl lg:text-7xl w-[95%] lg:w-[80%] text-center font-bold'>
                    Your AI Career Coach for
                    Professional Success
                </h1>
                <p className='text-xl w-[95%] lg:w-[50%] text-center 4xl:text-2xl text-gray-300'>
                    Advance your career with personalized guidance, interview prep, and AI-powered tools for job success.
                </p>
                <Link href={'/dashboard'}>
                    <Button>
                        Get Started
                    </Button>
                </Link>
                <Link href={'/dashboard'}>
                    <Button>
                        <Star/> GITHUB
                    </Button>
                </Link>
            </div>
        </section>
    )
}

export default HeroSection
