import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card } from '@/components/ui/card'
import { FileStack, FileText } from 'lucide-react'


export const ResumeLetterDialog = ({
    title , 
    onSubmit,

}) => {
    return (
        <Dialog>
        <DialogTrigger className=' '>
            <div 
                className=' h-[10rem] lg:w-[20rem] w-full flex items-start justify-center flex-col cursor-pointer'
            >
                <Card className = "w-full h-[50%] rounded-none border">
                    <div className=' flex items-center gap-4 px-5 h-full'>
                        {title == "Resume" ? (
                            <FileStack className=' h-8 w-8 text-green-600' />
                        ) : (
                            <FileText className=' h-8 w-8 text-blue-500' />
                        )}
                        <div className=''>
                            <h3 className=' font-medium text-[1.3rem] text-left'>{title}</h3>
                            <p className='text-[.8rem] mt-1 text-left'>Create from Scratch</p>
                        </div>
                    </div>
                </Card>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}
