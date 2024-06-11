import React from 'react'
import { SideBar } from '@/components/SideBar'
import { Header } from '../components/Header'
import { HeroPage } from './_components/HeroPage'
import { UserLetterREsume } from './_components/UserLetterREsume'

const DashBoardPage = () => {
    return (
        <div className=' dark:bg-stone-800 h-[100vh] flex items-start' >
            <div className=' h-full lg:w-[15%] lg:block hidden  border-r border-r-stone-300 dark:border-r-stone-700'>
                <SideBar/>
            </div>
            <div className=' h-full lg:w-[85%] w-full overflow-y-auto mb-[3rem]'>
                <Header/>
                <HeroPage/>
                <UserLetterREsume/>
                <br />
                <br />
            </div>
        </div>
    )
}

export default DashBoardPage
