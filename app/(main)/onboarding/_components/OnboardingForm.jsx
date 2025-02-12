'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { onBoardingFormSchema } from '@/app/lib/schema.zod'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import useFetch from '@/hooks/useFetch'
import { updateUser } from '@/actions/user'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const router = useRouter();

  const { isLoading: updateLoading, fn: updateUserFn, data: updatedResult } = useFetch(updateUser);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(onBoardingFormSchema)
  });

  const watchIndustry = watch("industry");

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`;
      await updateUserFn({ ...values, industry: formattedIndustry });
    } catch (error) {
      console.log("OnBoarding ERRORS: ", error.message);
    }
  }

  useEffect(() => {
    if (updatedResult?.success && !updateLoading) {
      toast.success("Profile Completed Successfully!!");
      router.push('/dashboard');
      router.refresh();
    }
  }, [updatedResult, updateLoading]);

  return (
    <div className='w-full flex items-center justify-center'>
      <Card className='max-w-xl w-full'>
        <CardHeader>
          <CardTitle className='text-4xl gradient-title'>Complete Your Profile</CardTitle>
          <CardDescription>Select your industry to get personalized career insights and recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-2'>
              <Label htmlFor='industry'>Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  // setSelectedIndustry(value)
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  )
                  setValue("subindustry", "")
                }}
                className='w-full'>
                <SelectTrigger id='industry'>
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {
                    industries.map((ind) => (
                      <SelectItem value={ind.id} key={ind.id}>{ind.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>

              {
                errors.industry && (
                  <p className='text-sm text-red-500'>
                    {errors.industry.message}
                  </p>
                )
              }

            </div>
            {watchIndustry && (
              <div className='space-y-2'>
                <Label htmlFor='industry'>Specialization</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("subIndustry", value);
                  }}
                  className='w-full'>
                  <SelectTrigger id='industry'>
                    <SelectValue placeholder="Select Your Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      selectedIndustry?.subIndustries.map((ind, idx) => (
                        <SelectItem value={ind} key={idx}>{ind}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>

                {
                  errors.industry && (
                    <p className='text-sm text-red-500'>
                      {errors.industry.message}
                    </p>
                  )
                }

              </div>
            )}
            <div className='space-y-2'>
              <Label htmlFor='experience'>Years of Experience</Label>
              <Input placeholder='Enter years of Experience' id='experience' type='number' min='0' max='50' {...register("experience")} />
              {
                errors.experience && (
                  <p className='text-sm text-red-500'>
                    {errors.experience.message}
                  </p>
                )
              }
            </div>
            <div className='space-y-2'>
              <Label htmlFor='skills'>Skills</Label>
              <Input placeholder='e.g. Python, JavaScript, Project Management' id='skills' type='text' {...register("skills")} />
              <p className='text-sm text-gray-500'>separate multiple skills with commas</p>
              {
                errors.skills && (
                  <p className='text-sm text-red-500'>
                    {errors.skills.message}
                  </p>
                )
              }
            </div>
            <div className='space-y-2'>
              <Label htmlFor='bio'>Professional Bio</Label>
              <Textarea placeholder='Tell us more about your professional background' className='h-32' id='bio' type='text' {...register("bio")} />
              {
                errors.bio && (
                  <p className='text-sm text-red-500'>
                    {errors.bio.message}
                  </p>
                )
              }
            </div>
            <Button type='submit' className='w-full' disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) :
                (
                  "Complete Profile"
                )
              }
            </Button>
          </form>
        </CardContent>
      </Card>

    </div>
  )
}

export default OnboardingForm
