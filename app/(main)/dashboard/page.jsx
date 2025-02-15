import { getIndustryInsights } from '@/actions/dashboard.api';
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'
import DashboardView from './_components/DashboardView';

const page = async () => {
    // Redirect to onboarding

    const { isOnboarded } = await getUserOnboardingStatus(); 
    if (!isOnboarded) redirect('/onboarding');
    const insights = await getIndustryInsights();
    return (
        <div className=''>
            <DashboardView insights={insights} />
        </div>
    )
}

export default page
