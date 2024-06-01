import React, { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Spinner from '@/components/ui/Spinner'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'



export const ResumeLetterDialog = ({
    title , 
    formTitle,
    placeholder,
    url,
    userId,
    mutationKey
}) => {

    const [name , setName] = useState('')
    const navigate = useNavigate()

    const onCreateResume = async (data) => {
        try {
            const res = await axios.post(url , data)
            if(res.status == 201 && res.data.resume == 'isResume'){
                navigate(`/dashboard/resume/${res.data.resumeId}`)
                localStorage.setItem('resumeId' , res.data.resumeId)
            }else if(res.status == 201 && res.data.letter){
                navigate(`/dashboard/cover-letter/${res.data.letterId}`)
                localStorage.setItem('cover_letterId' , res.data.letterId)
            }
        } catch (error) {
            enqueueSnackbar('Failed to Create' , {variant : 'error'})
        }
    }

    const {mutate , isPending} = useMutation({
        mutationKey : [mutationKey],
        mutationFn : onCreateResume 

    })


    const onSubmit = () => {
        let obj = {
            name : name,
            userId : userId
        }

        mutate(obj)
    }



    return (
        <Dialog>
        <DialogTrigger className=' '>
            <div 
                className=' h-[10rem] lg:w-[20rem] w-full flex items-start justify-center flex-col cursor-pointer'
            >
                <Card className = "w-full py-6 rounded-none border">
                    <div className=' lg:flex md:flex block items-center gap-4 px-5 h-full'>
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
            <DialogTitle>{formTitle}</DialogTitle>
            <br />
            <DialogDescription className = "text-left mt-3">
                <Input 
                    placeholder = {placeholder} 
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                    className =" border"
                    required
                />
                <Button 
                    variant = 'ghost'
                    onClick = {onSubmit}
                    className = "mt-4"
                >
                    { isPending ? <Spinner size={'md'} /> :  "Submit"}
                </Button>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}
