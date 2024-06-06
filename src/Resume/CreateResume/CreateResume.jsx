import { ModeToggle } from '@/components/ui/ModeTogle'
import React, { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { ResumeFormWrapper } from './ResumeFormWrapper'
import { useCreate } from '@/hook/useCreate'
import { useQuery } from '@tanstack/react-query'
import { NavLink, useParams } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { Footer } from '@/components/Footer'


export const CreateResume = () => {
    const {id} = useParams()
    const {fetchData} = useCreate()
    const [title , setTitle] = useState('Personal Info')

    const {data , isPending} = useQuery({
        queryKey : ['find percentage' , id],
        queryFn : () => fetchData(`https://mern-cv-builder.onrender.com/api/get/resume/percentage/${id}`)
    })

    return (
        <div className='dark:bg-stone-800 h-[100vh] overflow-y-scroll'>
            <div className=' container h-full'>
                <header >
                    <main className='flex items-center justify-between h-[5rem]'>
                        <NavLink to={'/dashboard/cover-letter'}>
                            <h1 
                                className=' lg:text-[2rem] md:text-[1.5rem] text-[1.3rem] font-medium text-blue-600 '
                                style={{
                                    textTransform : 'capitalize'
                                }}
                            >   
                                Cv.Builder
                            </h1>
                        </NavLink>
                        <ModeToggle/>
                    </main>
                </header>
                <section >
                    <h1 
                        className=' lg:text-[2.5rem] md:text-[2rem] text-[1.6rem] mt-4 mb-[2.3rem] text-stone-500 lg:text-left text-center font-medium dark:text-stone-300'
                        style={{
                                textTransform : 'capitalize'
                        }}
                    >{title}</h1>
                    <div className=' lg:block hidden'>
                        {isPending ? (
                            <Skeleton className={'h-5 w-8'} />
                        ) :(
                            <p className=' text-right'> {data}%</p>
                        )}
                        <Progress className = "mt-6 h-[.7rem]" value={data} />
                    </div>
                </section>
                <div className=' h-[50%]'>
                    <ResumeFormWrapper 
                        setTitle={setTitle}
                    />
                </div>
            </div>
        </div>
    )
}
