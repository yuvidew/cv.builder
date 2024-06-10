import React from 'react'
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs"
import { AllCoverResume } from './AllCoverResume'
import { AllResumeOrCover } from './AllResumeOrCover'

const user = JSON.parse(localStorage.getItem('cv_user'))

export const UserLetterREsume = () => {
    return (
        <section className='container'>
            <Tabs defaultValue="all" className="w-full mt-5">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                    <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <AllCoverResume url={`https://mern-cv-builder.onrender.com/api/get/all/${user._id}`} />
                </TabsContent>
                <TabsContent value="resume">
                    <AllResumeOrCover type={'resume'} url={`https://mern-cv-builder.onrender.com/api/get/resumes/${user._id}`} />
                </TabsContent>
                <TabsContent value="cover-letter">
                    <AllResumeOrCover type={'cover letter'} url={`https://mern-cv-builder.onrender.com/api/get/all/cover-letter/${user._id}`} />
                </TabsContent>
            </Tabs>
        </section>
    )
}
