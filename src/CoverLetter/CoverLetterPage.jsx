import { SideBar } from '@/components/SideBar'
import React from 'react'

const CoverLetterPage = () => {
    return (
        <div className=' dark:bg-stone-800 h-[100vh] flex items-start' >
            <div className=' h-full lg:w-[15%] lg:block hidden  border-r border-r-stone-300 dark:border-r-stone-700'>
                <SideBar/>
            </div>
            <div className=' h-full w-[85%]'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione dolorem vitae veniam expedita? Similique, perferendis quis! Facere perferendis dignissimos ea sit nam distinctio et voluptatibus libero temporibus. Repellendus, dolor nesciunt!
            </div>
        </div>
    )
}

export default CoverLetterPage