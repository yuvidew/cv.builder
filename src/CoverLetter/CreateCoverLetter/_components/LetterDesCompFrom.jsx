import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { useCreate } from '@/hook/useCreate'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Spinner from '@/components/ui/Spinner'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"


export const LetterDesFrom = () => {
    const {id} = useParams()
    const {onCreate} = useCreate()
    const [form , setForm] = useState({
        letterText : '',
    })

    const {mutate , isPending , isSuccess} = useMutation({
        mutationKey : ['add personal info in cover letter' , id],
        mutationFn : (data) => onCreate(`https://mern-cv-builder.onrender.com/api/post/cover-letter/letter-description/${id}` , data)
    })


    const onChange = (e) => {
        const {name , value} = e.target;
        setForm({
            ...form,
            [name] : value 
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        mutate(form)
    }

    return (
        <div className=' p-5'>
            <form action="" onSubmit={onSubmit} >
                <div  className=' mb-5'>
                    <Label 
                        htmlFor="email"
                        className = " uppercase text-stone-600 dark:text-stone-300 text-[1rem] block mb-3"
                    >
                        Letter Description <span className=' text-red-500'>*</span>
                    </Label>
                    <Textarea 
                        type = {'text'}
                        name = {'letterText'}
                        placeholder  = {'Enter letter description..'}
                        value = {form.letterText}
                        onChange = {onChange}
                        className = "border resize-none h-[15rem] outline-none text-[1rem] rounded-md dark:bg-stone-500 dark:placeholder:text-stone-300 "
                        required
                    />
                </div>

                <div className=' '>
                    <Button variant = "ghost" className = "mt-4">
                        {isPending ? (
                            <Spinner/>
                        ) : (
                            <>
                                <h3>
                                    Next 
                                </h3>
                                <ChevronRight className=' h-5 w-5' />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
