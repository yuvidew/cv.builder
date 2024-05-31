import { SideBar } from '@/components/SideBar'
import React from 'react'

const ResumePage = () => {
    return (
        <div className=' dark:bg-stone-800 h-[100vh] flex items-start' >
            <div className=' h-full w-[15%] border-r-2 border-r-stone-300'>
                <SideBar/>
            </div>
            <div className=' h-full w-[85%]'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione dolorem vitae veniam expedita? Similique, perferendis quis! Facere perferendis dignissimos ea sit nam distinctio et voluptatibus libero temporibus. Repellendus, dolor nesciunt!
            </div>
        </div>
    )
}

export default ResumePage