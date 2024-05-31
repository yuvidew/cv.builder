import React from 'react'
import { Button } from './ui/button'
import { EllipsisVertical } from 'lucide-react'

export const Footer = () => {
    return (
        <footer className=' border-t-2 border-t-stone-300'>
            <div className=' flex items-center justify-between pt-5 h-[3rem]'>
                <div className=' '>
                    <h1 className=' text-stone-600 dark:text-stone-300'>Cv.Builder</h1>
                </div>
                <div className=' lg:flex hidden items-center justify-end gap-3'>
                    <Button variant = "link">
                        Terms
                    </Button>
                    <Button variant = "link">
                        Privacy
                    </Button>
                    <Button variant = "link">
                        Security
                    </Button>
                    <Button variant = "link">
                        Connect
                    </Button>
                </div>
                <div className=' lg:hidden flex items-center justify-end'>
                    <EllipsisVertical />
                </div>
            </div>
        </footer>
    )
}
