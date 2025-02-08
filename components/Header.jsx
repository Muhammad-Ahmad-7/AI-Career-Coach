import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "../public/logo.png"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

const Header = () => {
    return (
        <header>
            <nav className='p-5 flex items-center justify-between bg-background/80 border-b fixed top-0 w-full backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/80'>
                <div>
                    <Link href={'/'}>
                        <Image
                            src={logo}
                            width={130}
                            height={130}
                            alt='sensai-logo'
                        />
                    </Link>
                </div>
                <div className='flex gap-2'>
                    <SignedOut>
                        <Button asChild>
                            <SignInButton />
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <Link href={'/dashboard'}>
                            <Button variant='outline'>
                                <LayoutDashboard className='w-4 h-4' />
                                <span className='hidden md:block'>Industry Insights</span>
                            </Button>
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <StarIcon className='w-4 h-4' />
                                    <span className='hidden md:block'>Growth Tools</span>
                                    <ChevronDown className='w-4 h-4' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link href={'/ai-cover-letter'} className='flex space-x-2 justify-center items-center'>
                                        <FileText className='w-4 h-4' />
                                        <span>Resume</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={'/interview'} className='flex space-x-2 justify-center items-center'>
                                        <PenBox className='w-4 h-4' />
                                        <span>Cover Letter</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={'/resume'} className='flex space-x-2 justify-center items-center'>
                                        <GraduationCap className='w-4 h-4' />
                                        <span>Interview Prep</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10",
                                    userButtonPopoverCard: "shadow-xl",
                                    userPreviewMainIdentifier: "font-semibold"
                                }
                            }}
                            afterSwitchSessionUrl='/'
                        />
                    </SignedIn>
                </div>
            </nav>
        </header>
    )
}

export default Header
