import { MobileNav } from '@/components/MobileNav'
import { ModeToggle } from '@/components/ui/ModeTogle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, User } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = ({
    url
}) => {
    const user = JSON.parse(localStorage.getItem('cv_user'));
    return (
        <header className=' h-[6rem] border-b border-b-stone-300 dark:border-b-stone-600 '>
            <main className=' container flex items-center justify-between h-full'>
                <div className='h-full flex items-center justify-start'>
                <NavLink to={url}>
                    <h1 className='lg:hidden lg:text-[2rem] md:text-[1.5rem] text-[1.3rem] font-medium text-blue-600'>
                        Cv.Builder
                    </h1>
                </NavLink>
                    <div className='lg:flex hidden items-center gap-2 bg-stone-300 dark:bg-stone-100 px-3 rounded-md'>
                        <Search className='h-4 w-5 ml-2 dark:text-stone-900' />
                        <Input 
                            placeholder = "Search here..." 
                            className = "bg-transparent dark:text-stone-900"
                        />
                    </div>
                </div>
                <div className=' h-full flex items-center justify-end gap-3'>
                    <Button variant = "ghost"  className = "flex items-center gap-3 ">
                        <User className=' h-5 w-5' />
                        <h1 style={{
                            textTransform : 'capitalize'
                        }}>
                            {user.name}
                        </h1>
                    </Button>
                    <div className='lg:block hidden'>
                        <ModeToggle/>
                    </div>
                    <div className='lg:hidden '>
                        <MobileNav/>
                    </div>
                </div>
            </main>
        </header>
    )
}
