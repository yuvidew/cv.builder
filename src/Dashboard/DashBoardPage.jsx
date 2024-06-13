import React, { useEffect } from 'react'
import { SideBar } from '@/components/SideBar'
import { Header } from '../components/Header'
import { HeroPage } from './_components/HeroPage'
import { UserLetterREsume } from './_components/UserLetterREsume'
import { useNavigate } from 'react-router-dom'

const DashBoardPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem('cv_user_token')){
            navigate('/')
        }
    } , [])
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
