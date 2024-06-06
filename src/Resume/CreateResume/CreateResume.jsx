import { ModeToggle } from '@/components/ui/ModeTogle'
import React, { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { ResumeFormWrapper } from './ResumeFormWrapper'
import { useCreate } from '@/hook/useCreate'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'


export const CreateResume = () => {
    const {id} = useParams()
    const {fetchData} = useCreate()
    const [title , setTitle] = useState('Personal Info')

    const {data , isPending} = useQuery({
        queryKey : ['find percentage' , id],
        queryFn : () => fetchData(`https://mern-cv-builder.onrender.com/api/get/resume/percentage/${id}`)
    })

    return (
        <div className='dark:bg-stone-800 h-[100vh]'>
            <div className=' container '>
                <header >
                    <main className='flex items-center justify-between h-[5rem]'>
                        <h1 
                            className=' lg:text-[2rem] md:text-[1.5rem] text-[1.3rem] font-medium text-blue-600 dark:text-stone-100'
                            style={{
                                textTransform : 'capitalize'
                            }}
                        >Cv.Builder</h1>
                        <ModeToggle/>
                    </main>
                </header>
                <section >
                    <h1 
                        className=' text-[2.5rem] mt-4 text-stone-500 font-medium dark:text-stone-300'
                        style={{
                                textTransform : 'capitalize'
                        }}
                    >{title}</h1>
                    {isPending ? (
                        <Skeleton className={'h-5 w-8'} />
                    ) :(
                        <p className=' text-right'> {data}%</p>
                    )}
                    <Progress className = "mt-6 h-[.7rem]" value={data} />
                </section>
                <ResumeFormWrapper 
                    setTitle={setTitle}
                />
            </div>
        </div>
    )
}
