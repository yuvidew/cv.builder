import React from 'react'
import { Card, CardContent, CardTitle } from './ui/card'
import { EllipsisVertical, FileText, SquareGanttChart, Trash2 } from 'lucide-react'
import { Progress } from './ui/progress'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCreate } from '@/hook/useCreate'
import { useMutation } from '@tanstack/react-query'
import Spinner from './ui/Spinner'
import { NavLink } from 'react-router-dom'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ResumeCoverLetterDialog } from './ResumeCoverLetterDialog'


export const TheRCCard = ({
    ele
}) => {

    const {deleteById} = useCreate()
    const {mutate , isPending} = useMutation({
        mutationKey : ['delete' , ele._id],
        mutationFn : (id) => deleteById(`https://mern-cv-builder.onrender.com/api/delete/cover-letter/${id}`)
    })

    const onClick = (id) => {
        mutate(id)
    } 


    return (
        <Card className={'lg:h-[20rem] md:h-[20rem] h-[15rem] bg-stone-100 dark:bg-stone-600 '}>
            <CardContent className = "py-3 h-full relative ">
                <div className=' absolute right-5 top-3'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className=' outline-none' >
                            <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {isPending ? (
                                <DropdownMenuItem>
                                    <Spinner/>
                                </DropdownMenuItem>
                            ) : (
                            <DropdownMenuItem 
                                className = " cursor-pointer" 
                                onClick = {() => onClick(ele._id)}
                            >
                                <Trash2 className=' text-red-600 mr-2' />
                                Delete
                            </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <NavLink to={ele.resumeName ? `/dashboard/resume/${ele._id}` : `/dashboard/cover-letter/${ele._id}`} >
                    <div className={` ${ele.completePercentage == 100 ? 'h-[40%]' : "h-[60%]"}  flex items-center justify-center`}>
                        {ele.letterName ? (
                            <SquareGanttChart className=' lg:h-[6rem] lg:w-[6rem] mb:h-[6rem] mb:w-[6rem] h-[3rem] w-[3rem] m-auto text-blue-500' />
                        ):(
                            <FileText className=' lg:h-[6rem] lg:w-[6rem] mb:h-[6rem] mb:w-[6rem] h-[3rem] w-[3rem] m-auto text-green-500' />
                        )}
                    </div>
                    <div className=' flex items-center justify-between pt-5'>
                        <CardTitle className = "lg:text-[1.2rem] md:text-[1.2rem] text-[1rem] font-medium ">{ele.resumeName} {ele.letterName}</CardTitle>
                        <p className=' text-stone-400 lg:text-[1rem] md:text-[1rem] text-[.7rem]'>{ele.completePercentage || 0}%</p>
                    </div>
                    <Progress className = "lg:h-[.8rem] md:h-[.8rem] h-[.5rem] mt-[1rem]" value = {ele.completePercentage} />

                </NavLink>
                {ele.completePercentage == 100 && (
                    <ResumeCoverLetterDialog 
                        url = {ele.letterName  ?  `https://mern-cv-builder.onrender.com/api/get/cover-letter/${ele._id}` : `https://mern-cv-builder.onrender.com/api/get/resume/${ele._id}`}
                        btnText={ele.letterName ? 'Check Letter' : "Check resume"}
                        id={ele._id}
                    />
                )}
                <br />
            </CardContent>
        </Card>
    )
}

