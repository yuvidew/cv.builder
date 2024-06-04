import { ModeToggle } from '@/components/ui/ModeTogle'
import { Progress } from '@radix-ui/react-progress'
import React, { useState } from 'react'

export const CreateCoverLetter = () => {
    const [title , setTitle] = useState('Personal Info')
    return (
        <div className='dark:bg-stone-800 h-[100vh]' >
            <div className=' container'>
                <header>
                    <main className='flex items-center justify-between h-[5rem]'>
                        <h1 className=' lg:text-[2rem] md:text-[1.5rem] text-[1.3rem] font-medium text-blue-600 dark:text-stone-100'>Cv.Builder</h1>
                        <ModeToggle/>
                    </main>
                </header>
                <section>
                    <h1 className=' text-[2.5rem] mt-4 text-stone-500 font-medium dark:text-stone-300'>{title}</h1>
                    {/* <p className=' text-right'> {data}%</p> */}
                    <Progress className = "mt-6 h-[.7rem]" value={20} />
                </section>
            </div>
        </div>
    )
}
