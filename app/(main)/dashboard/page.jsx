import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    // Redirect to onboarding

    const { isOnboarded } = await getUserOnboardingStatus(); 
    if (!isOnboarded) redirect('/onboarding');
    return (
        <div className='text-white bg-red-600 h-100 w-100'>
            Dashboard
        </div>
    )
}

export default page
