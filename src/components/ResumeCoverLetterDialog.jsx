import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { useQuery } from '@tanstack/react-query'
import { useCreate } from '@/hook/useCreate'
import Spinner from './ui/Spinner'
import darkImg from '@/assets/failed-dark.png'
import { Resume } from './Resume'
import CoverLetterPage from '@/CoverLetter/CoverLetterPage'


export const ResumeCoverLetterDialog = ({
    btnText, 
    id,
    url
}) => {
    const {fetchData} = useCreate()
    const {data , isPending , isError} = useQuery({
        queryKey : ['fetch the resume' , id],
        queryFn : () => fetchData(url)
    })

    return (
    <Dialog >
        <DialogTrigger className='w-full'>
            <Button
                size = "sm" 
                variant ='ghost' 
                className = "mt-5 w-full"
            >
                {btnText}
            </Button>
        </DialogTrigger>
        <DialogContent className = "dark:bg-stone-700 border-none p-0 lg:w-[50%] md:w-[65%] w-[95%]">
            <div className=' p-5'>
                {isPending && <div className=' h-full w-full flex items-center justify-center'>
                    <Spinner className = "" />
                </div>}
                {isError && <div className=' h-full w-full flex flex-col gap-2 items-center justify-center'>
                    <img className=' dark:hidden block lg:h-[7rem] lg:w-[7rem] h-[5rem] w-[5rem] object-contain' src={darkImg} />
                    <img className=' dark:block hidden lg:h-[7rem] lg:w-[7rem] h-[5rem] w-[5rem] object-contain' src={darkImg} />
                    <h1 className=' text-stone-200'>Failed To Fetch Data</h1>
                </div>}

                { data != undefined &&
                    data.letterName ? (
                        <CoverLetterPage data = {data} />
                    ) : (
                        <Resume data = {data} />
                    )
                }
            </div>
        </DialogContent>
    </Dialog>
    )
}
