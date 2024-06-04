import { ModeToggle } from '@/components/ui/ModeTogle'
import React from 'react'
import { Progress } from "@/components/ui/progress"
import { ResumeFormWrapper } from './ResumeFormWrapper'
import { useCreate } from '@/hook/useCreate'
import { useQuery } from '@tanstack/react-query'

const id = localStorage.getItem('resumeId')

export const CreateResume = () => {
    const {fetchData} = useCreate()

    const {data , isPending} = useQuery({
        queryKey : ['find percentage'],
        queryFn : () => fetchData(`https://mern-cv-builder.onrender.com/api/get/resume/percentage/${id}`)
    })

    console.log("data" , data);

    return (
        <div className='dark:bg-stone-800 h-[100vh]'>
            <div className=' container '>
                <header >
                    <main className='flex items-center justify-between h-[5rem]'>
                        <h1 className=' lg:text-[2rem] md:text-[1.5rem] text-[1.3rem] font-medium text-blue-600 dark:text-stone-100'>Cv.Builder</h1>
                        <ModeToggle/>
                    </main>
                </header>
                <section >
                    <h1 className=' text-[2.5rem] mt-4 text-stone-500 font-medium dark:text-stone-300'>Personal Info</h1>
                    <p className=' text-right'> {data}%</p>
                    <Progress className = "mt-6 h-[.7rem]" value={data} />
                </section>
                <ResumeFormWrapper/>
            </div>
        </div>
    )
}
