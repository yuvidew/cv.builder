import React from 'react'
import { SideBar } from '@/components/SideBar'
import { Header } from './_components/Header'

const DashBoardPage = () => {
    return (
        <div className=' dark:bg-stone-800 h-[100vh] flex items-start' >
            <div className=' h-full w-[15%] border-r border-r-stone-300'>
                <SideBar/>
            </div>
            <div className=' h-full w-[85%] '>
                <Header/>
            </div>
        </div>
    )
}

export default DashBoardPage
