import { FileText, Home, SquareGanttChart } from 'lucide-react'
import React from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'

export const SideBar = () => {
    const pathname = useLocation()
    console.log(pathname.pathname);
    const navLink = [
        {
            text : 'DashBoard',
            icon : <Home className=' h-5 w-5 mr-1' />,
            link : '/dashboard'
        },
        {
            text : 'Resume',
            icon : <FileText className=' h-5 w-5 mr-1' />,
            link : '/dashboard/resume'
        },
        {
            text : 'Cover',
            icon : <SquareGanttChart className=' h-5 w-5 mr-1' />,
            link : '/dashboard/cover-letter'
        },
    ]
    return (
        <header className=' h-full  px-5 py-4'>
            <div className=' h-[4rem] flex items-start justify-start'>
                <h1 className='  text-[1.3rem] font-bold'>Cv.Builder</h1>
            </div>
            <main>
                <h3 className=' uppercase text-[.9rem]'>Menu</h3>
                <nav className=' mt-4'>
                    {navLink.map((ele) => (
                        <NavLink 
                            key={ele.text} 
                            to={ele.link} 
                            className={`flex items-center gap-1 h-[3rem] px-2 rounded-md mt-1 ${pathname.pathname == ele.link ? 'opacity-100 border-l-4 border-stone-700 dark:border-stone-300 bg-slate-100 dark:bg-stone-500 ' : 'opacity-50 '}`}
                        >
                            {ele.icon}
                            {ele.text}
                        </NavLink>
                    ))}
                </nav>
            </main>
        </header>
    )
}
