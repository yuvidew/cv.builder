import { ModeToggle } from '@/components/ui/ModeTogle'
import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { LetterFormsWrapper } from './LetterFormsWrapper'
import { Progress } from '@/components/ui/progress'
import { useCreate } from '@/hook/useCreate'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'

export const CreateCoverLetter = () => {
    const {id} = useParams()
    const {fetchData} = useCreate()
    const [title , setTitle] = useState('Personal-Info')

    const {data , isPending} = useQuery({
        queryKey : ['find percentage' , id],
        queryFn : () => fetchData(`https://mern-cv-builder.onrender.com/api/get/cover-letter/percentage/${id}`)
    })

    return (
        <div className='dark:bg-stone-800 h-[100vh]' >
            <div className=' container'>
                <header>
                    <main className='flex items-center justify-between h-[5rem]'>
                        <NavLink to={'/dashboard/cover-letter'} >
                            <h1 
                                className=' lg:text-[2rem] md:text-[1.5rem] text-[1.3rem] font-medium text-blue-600'>
                                Cv.Builder
                            </h1>
                        </NavLink>
                        <ModeToggle/>
                    </main>
                </header>
                <section>
                    <h1 
                        className=' lg:text-[2.5rem] md:text-[1.7rem] text-[1.5rem] lg:text-left text-center mt-4 text-stone-500 font-medium dark:text-stone-300'
                        style={{
                                textTransform : 'capitalize'
                        }}
                    >{title}</h1>

                    {isPending ? (
                        <div className=' items-end justify-end lg:flex hidden'>
                            <Skeleton className={'h-5 w-8 text-right'} />
                        </div>
                    ) :(
                        <p className=' text-right lg:block hidden'> {data}%</p>
                    )}
                    <Progress className = " lg:block hidden mt-6 h-[.7rem]" value={data} />
                </section>
                <LetterFormsWrapper setTitle={setTitle} />
            </div>
        </div>
    )
}
