import React from 'react'
import { ResumeLetterDialog } from './ResumeLetterDialog'

export const HeroPage = () => {
    const user = JSON.parse(localStorage.getItem('cv_user'))
    
    return (
        <section>
            <div className=' container border-b border-b-stone-300 dark:border-b-stone-600'>
                <div className=' grid lg:grid-cols-3  gap-3 pt-5'>
                    <div className=' h-[10rem] lg:col-span-1  col-span-2  flex items-start justify-center flex-col p-5'>
                        <h1 
                            style={{
                                textTransform  : "capitalize"
                            }} 
                            className=' text-blue-500 text-[2rem] font-bold'
                        >
                            Hello, {user.name}!
                        </h1>
                        <p className=' dark:text-stone-300 text-stone-500 mt-2'>What do you want to create.</p>
                    </div>
                    <ResumeLetterDialog 
                        userId = {user._id} 
                        url = "https://mern-cv-builder.onrender.com/api/post/create/resume"
                        formTitle={"Create Resume"} 
                        mutationKey = "resume" 
                        title={'Resume'}  
                        placeholder={"Enter resume name.."}
                    />
                    <ResumeLetterDialog 
                        userId = {user._id} 
                        url = "https://mern-cv-builder.onrender.com/api/post/create/cover-letter"
                        formTitle={"Create Cover Letter"} 
                        mutationKey = "covet letter" 
                        title={'Cover letter'}  
                        placeholder={"Enter cover letter name.."}
                    />
                </div>
            </div>
        </section>
    )
}
