
import { Header } from '@/components/Header'
import { SideBar } from '@/components/SideBar'
import React from 'react'
import { Container } from './_components/Container'

const ResumePage = () => {
    return (
        <div className=' dark:bg-stone-800  flex items-start' >
            <div className=' h-full lg:w-[15%] lg:block hidden  border-r border-r-stone-300 dark:border-r-stone-700'>
                <SideBar/>
            </div>

            <div className=' h-full lg:w-[85%] w-full'>
                <Header url={'/dashboard/resume'} />
                <Container/>
            </div>
        </div>
    )
}

export default ResumePage