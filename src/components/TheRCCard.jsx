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


export const TheRCCard = ({
    ele
}) => {

    const {deleteById} = useCreate()

    const {mutate , isPending} = useMutation({
        mutationKey : ['delete' , ele._id],
        mutationFn : (id) => deleteById(`http://localhost:2000/api/delete/cover-letter/${id}`)
    })

    const onClick = (id) => {
        mutate(id)
    } 

    return (
        <Card className={'h-[20rem] bg-stone-100 dark:bg-stone-600 '}>
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
                    <div className=' h-[60%]  flex items-center justify-center'>
                        {ele.letterName ? (
                            <SquareGanttChart className=' h-[6rem] w-[6rem] m-auto text-blue-500' />
                        ):(
                            <FileText className=' h-[6rem] w-[6rem] m-auto text-green-500' />
                        )}
                    </div>
                    <div className=' flex items-center justify-between pt-5'>
                        <CardTitle className = "text-[1.2rem] font-medium ">{ele.resumeName} {ele.letterName}</CardTitle>
                        <p className=' text-stone-400'>{ele.completePercentage || 0}%</p>
                    </div>
                    <Progress className = "h-[.8rem] mt-[1rem]" value = {ele.completePercentage} />
                </NavLink>
            </CardContent>
        </Card>
    )
}

