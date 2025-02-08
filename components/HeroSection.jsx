import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ArrowBigRight, ArrowLeftSquare, Github, Star } from 'lucide-react'
import bannerImage from '../public/banner3.jpeg'
import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { features } from '@/data/features'
import { howItWorks } from '@/data/howItWorks'
import { testimonial } from '@/data/testimonial'
import { faqs } from '@/data/faqs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

const HeroSection = () => {
    return (
        <>
            <section className='flex justify-center items-center pt-[20vh] flex-col gap-5'>
                <div className='flex justify-center items-center flex-col gap-5'>
                    <h1 className='text-4xl md:text-6xl lg:text-7xl w-[95%] lg:w-[80%] text-center font-bold'>
                        Your AI Career Coach for
                        Professional Success
                    </h1>
                    <p className='text-xl w-[95%] lg:w-[50%] text-center 4xl:text-2xl text-gray-300'>
                        Advance your career with personalized guidance, interview prep, and AI-powered tools for job success.
                    </p>
                    <div className='flex justify-center items-center gap-2'>
                        <Link href={'/dashboard'}>
                            <Button>
                                Get Started
                            </Button>
                        </Link>
                        <Link href={'https://github.com/Muhammad-Ahmad-7/AI-Career-Coach'} target='_blank'>
                            <Button variant='outline'>
                                <Star /> GITHUB
                            </Button>
                        </Link>
                    </div>
                </div>
                <section className='flex items-center justify-center'>
                    <div>
                        <Image
                            src={bannerImage}
                            alt='Banner Image'
                            width={1280}
                            height={720}
                            className='rounded-lg border shadow-2xl mx-auto'
                            priority
                        />
                    </div>
                </section>
            </section>
            <section className='pt-28 bg-background flex justify-center items-center gap-5 flex-col'>
                <h1 className='text-center md:text-6xl w-[95%] lg:w-[80%] lg:text-3xl font-bold '>Powerful Features for Your Career Growth</h1>
                <div className='flex items-center w-[70%] justify-center gap-5 mb-24 mt-11 flex-wrap'>
                    {
                        features.map((feature, idx) => {
                            return (
                                <Card key={idx} className='flex justify-center flex-col items-center w-[250px] h-[240px] hover:border-white border-2'>
                                    <CardContent className='flex justify-center flex-col items-center'>
                                        {feature.icon}
                                        <h1 className='text-xl font-bold text-center'>{feature.title}</h1>
                                        <p className='text-center text-base text-gray-400'>{feature.description}</p>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </div>
            </section>
            <section className='bg-muted/50 w-full flex justify-center items-center'>
                <div className='w-[70%] flex justify-center items-center gap-20 py-20 flex-wrap'>
                    <div className='flex justify-center items-center flex-col gap-3'>
                        <h1 className='text-4xl font-bold'>50+</h1>
                        <p className='text-gray-400'>Industries Covered</p>
                    </div>
                    <div className='flex justify-center items-center flex-col gap-3'>
                        <h1 className='text-4xl font-bold'>1000+</h1>
                        <p className='text-gray-400'>Interview Questions</p>
                    </div>
                    <div className='flex justify-center items-center flex-col gap-3'>
                        <h1 className='text-4xl font-bold'>95%</h1>
                        <p className='text-gray-400'>Success Rate</p>
                    </div>
                    <div className='flex justify-center items-center flex-col gap-3'>
                        <h1 className='text-4xl font-bold'>24/7</h1>
                        <p className='text-gray-400'>AI Support </p>
                    </div>
                </div>
            </section>
            <section className='bg-background flex justify-center items-center flex-col'>
                <div className='pt-20 flex justify-center items-center flex-col'>
                    <h1 className='text-3xl font-bold text-center'>How It Works</h1>
                    <p className='text-gray-400 text-center'>Four simple steps to accelerate your career growth</p>
                </div>
                <div className='flex items-center w-[80%] justify-center gap-5 flex-wrap mb-5'>
                    {
                        howItWorks.map((feature, idx) => {
                            return (
                                <div key={idx} className='flex justify-center flex-col items-center w-[270px] h-[240px] gap-5'>
                                    <div className='rounded-full p-5 bg-muted'>
                                        {feature.icon}
                                    </div>
                                    <h1 className='text-xl font-bold text-center'>{feature.title}</h1>
                                    <p className='text-center text-base text-gray-400'>{feature.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <section className='bg-muted/50 w-full flex flex-col justify-center items-center'>
                <div className='py-20'>
                    <h1 className='text-3xl font-bold text-center mb-10'>What Our Users Say</h1>
                    <div className='flex items-center justify-center gap-5 flex-wrap'>
                        {
                            testimonial.map((testimonial, idx) => {
                                return (
                                    <Card key={idx} className='flex flex-col p-2 w-[350px] h-[220px]'>
                                        <CardContent className='flex gap-10 flex-col'>
                                            <div className='flex items-center gap-5'>
                                                <img src={testimonial.image} width={50} height={50} className='rounded-full' />
                                                <div>
                                                    <h1 className='font-bold text-xl'>{testimonial.author}</h1>
                                                    <p className='text-gray-400 text-sm'>{testimonial.role}</p>
                                                    <h2 className='text-base'>{testimonial.company}</h2>
                                                </div>
                                            </div>
                                            <div>
                                                <p className='italic font-base text-gray-400'>
                                                    <span className='text-2xl text-white font-extrabold'>"</span>
                                                    {testimonial.quote}
                                                    <span className='text-2xl text-white font-extrabold'>"</span>
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            <section className='bg-background/40 flex justify-center items-center flex-col gap-10 my-10'>
                <div className='pt-20 flex justify-center items-center flex-col gap-5'>
                    <h1 className='text-3xl font-bold text-center'>Frequently Asked Questions</h1>
                    <p className='text-gray-400 text-center'>Find answers to common questions about our platform</p>
                </div>
                <div className='flex items-center flex-col w-[50%] max-lg:w-[90%] justify-center flex-wrap my-5'>
                    {
                        faqs.map((item, idx) => {
                            return (
                                <Accordion key={idx} type="single" collapsible className='w-full'>
                                    <AccordionItem value="item-1" className=''>
                                        <AccordionTrigger className='text-sm text-left'>{item.question}</AccordionTrigger>
                                        <AccordionContent className='text-sm text-left'>
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            )
                        })
                    }
                </div>
            </section>
            <section className='rounded-xl bg-gradient-to-br flex flex-col justify-center items-center w-full bg-radial-[at_25%_25%] from-white to-zinc-500 to-75% py-10 text-black px-5 gap-7'>
                <h1 className='text-5xl max-lg:text-3xl font-bold text-center'>Ready to Accelerate Your Career?
                </h1>
                <p className='text-center lg:w-[30%] text-gray-900'>
                    Join thousands of professionals who are advancing their careers with AI-powered guidance.
                </p>
                <Button variant='outline' className='text-white animate-bounce'>
                    Start Your Journey Today <ArrowBigRight/>
                </Button>
            </section>
        </>

    )
}

export default HeroSection
