import Spinner from '@/components/ui/Spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreate } from '@/hook/useCreate'
import { useMutation } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

const id = localStorage.getItem('resumeId')

export const EducationFrom = ({
    formType,
    onAddType
}) => {
    const {onCreate} = useCreate()
    const [form , setForm] = useState({
        degreeCourse : '',
        instituteCollage : '',
        year : '',
        city : '',
        state : '',
    })
    const inputList = [
        {
            label : 'Institute/Collage Name',
            name : 'instituteCollage',
            value: 'instituteCollage',
            placeholder : "Enter institute/collage name..",
            size : "col-span-2"
        },
        {
            name : 'degreeCourse',
            value: 'degreeCourse',
            placeholder : "Enter subject..",
            label : 'subject'
        },
        {
            name : 'year',
            value: 'year',
            placeholder : "Enter passing year..",
            label : "Passing Year"
        },
        {
            name : 'city',
            value: 'city',
            placeholder : "Enter city..",
            label : "City",
        },
        {
            name : 'state',
            value: 'state',
            placeholder : "Enter state..",
            label : "State",
        },
    ]

    const onChange = (e) => {
        const {name , value} = e.target;
        setForm({
            ...form,
            [name] : value 
        })
    }

    const {mutate , isPending  , isSuccess} = useMutation({
        mutationKey : ['add work experience'],
        mutationFn : (data) => onCreate(`https://mern-cv-builder.onrender.com/api/post/create/resume/add-eduction-detail/${id}` , data)
    })

    const onSubmit = (e) => {
        e.preventDefault();
        mutate(form)
    }

    if(isSuccess){
        onAddType(formType)
    }

    return (
        <section className='p-5'>
            <form action="" onSubmit={onSubmit}>
                <div className=' grid grid-cols-2 gap-2'>
                {inputList.map((ele) => (
                    <div key={ele.name} className={` ${ele.size}  mb-5`}>
                        <Label 
                            htmlFor="email"
                            className = {`uppercase text-stone-600 dark:text-stone-300 text-[1rem] block mb-3`}
                            >
                            {ele.label} <span className=' text-red-500'>*</span>
                        </Label>
                        <Input 
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

                <Button variant = "ghost" >
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
            </form>
        </section>
    )
}
