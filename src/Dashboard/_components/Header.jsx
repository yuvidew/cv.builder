import { ModeToggle } from '@/components/ui/ModeTogle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, User } from 'lucide-react'
import React from 'react'

export const Header = () => {
    const user = JSON.parse(localStorage.getItem('cv_user'))
    console.log(user);
    return (
        <header className=' h-[4rem] border-b border-b-stone-300 flex items-center justify-between px-5'>
            <div className='h-full flex items-center justify-start'>
                <div className='flex items-center gap-2 bg-stone-300 dark:bg-stone-100 px-3 rounded-md'>
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
                <ModeToggle/>
            </div>
        </header>
    )
}
