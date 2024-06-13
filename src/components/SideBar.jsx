import { FileText, Home, Power, SquareGanttChart } from 'lucide-react'
import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

export const SideBar = () => {
    const pathname = useLocation()
    const navigate = useNavigate()
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

    const onLogout = () => {
        localStorage.removeItem('cv_user_token')
        navigate('/')
    }
    return (
        <header className=' h-full  px-5 py-4'>
            <div className=' h-[4rem] flex items-start justify-start'>
                <h1 className='  text-[1.3rem] font-bold'>Cv.Builder</h1>
            </div>
            <main className=' h-[80%]'>
                <h3 className=' uppercase text-[.9rem]'>Menu</h3>
                <nav className=' mt-4 '>
                    {navLink.map((ele) => (
                        <NavLink 
                            key={ele.text} 
                            to={ele.link} 
                            className={`flex items-center gap-1 h-[3rem] px-2 rounded-md mt-1 ${pathname.pathname == ele.link ? 'opacity-100 border-l-4 border-blue-500 text-blue-500 dark:text-stone-100 bg-slate-100 dark:bg-stone-500 ' : 'opacity-50 '}`}
                        >
                            {ele.icon}
                            {ele.text}
                        </NavLink>
                    ))}
                </nav>
            </main>
            <div className=' h-[10%]  flex items-center justify-center'>
                <Button variant = "dark" size = "sm" onClick  = {onLogout} >
                    <Power className=' h-4 w-4 mr-2 text-red-500' />
                    Logout
                </Button>
            </div>
        </header>
    )
}
