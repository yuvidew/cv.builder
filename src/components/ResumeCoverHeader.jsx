import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

export const ResumeCoverHeader = ({
    url,
    onDownload
}) => {
    return (
        <header>
            <div className=' container'>
                <main className=' flex items-center justify-between h-[4rem]'>
                    <NavLink to={url} className={'h-full flex items-center justify-start'}>
                        <h1 className=' lg:text-[1.5rem] md:text-[1.5rem] text-[1.3rem] font-medium text-blue-600'>
                            Cv.Builder
                        </h1>
                    </NavLink>
                    <Button size = "sm" onClick = {onDownload} variant = 'green' >
                        <Download className=' lg:mr-2 md:mr-2 h-5 w-5' /> <span className='lg:block md:block hidden'>Download</span>
                    </Button>
                </main>
            </div>
        </header>
    )
}
