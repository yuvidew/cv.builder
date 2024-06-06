import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { useCreate } from '@/hook/useCreate'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Spinner from '@/components/ui/Spinner'
import { Button } from '@/components/ui/button'

const inputList = [
    {
        type : "text",
        name : 'name',
        placeholder : 'Enter name..',
        value : 'name'
    },
    {
        type :'email',
        name : 'email',
        placeholder : 'Enter email..',
        value : 'email'
    },
    {
        type : "number",
        name : 'number',
        placeholder : 'Enter phone number..',
        value : 'number'
    },
    {
        type : "text",
        name : 'profession',
        placeholder : 'Enter your profession..',
        value : 'profession'
    },
    {
        type : "text",
        name : 'address',
        placeholder : 'Enter address..',
        value : 'address'
    },
    
]

export const PersonalInfoFrom = ({
    onAddType , 
    formType
}) => {
    const {id} = useParams()
    const {onCreate} = useCreate()
    const [form , setForm] = useState({
        name : '',
        profession : '',
        address : '',
        number : '',
        email : '',
    })

    const {mutate , isPending , isSuccess} = useMutation({
        mutationKey : ['add personal info in cover letter' , id],
        mutationFn : (data) => onCreate(`https://mern-cv-builder.onrender.com/api/post/cover-letter/personal-info/${id}` , data)
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

    if(isSuccess){
        onAddType(formType)
    }

    return (
        <div className=' p-5'>
            <form action="" onSubmit={onSubmit} >
                <div className=' grid grid-cols-2 gap-3'>
                {inputList.map((ele) => (
                    <div key={ele.name} className=' mb-5'>
                        <Label 
                            htmlFor="email"
                            className = " uppercase text-stone-600 dark:text-stone-300 text-[1rem] block mb-3"
                        >
                            {ele.name} <span className=' text-red-500'>*</span>
                        </Label>
                        <Input 
                            type = {ele.type}
                            name = {ele.name}
                            placeholder  = {ele.placeholder}
                            value = {form[ele.value]}
                            onChange = {onChange}
                            className = "border text-[1rem] rounded-md dark:bg-stone-500 dark:placeholder:text-stone-300 "
                            required
                        />
                    </div>
                ))}
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
