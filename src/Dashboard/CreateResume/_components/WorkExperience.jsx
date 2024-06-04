import Spinner from '@/components/ui/Spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCreate } from '@/hook/useCreate'
import { useMutation } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

const id = localStorage.getItem('resumeId')

export const WorkExperience = ({
    formType,
    onAddType
}) => {
    const {onCreate} = useCreate()
    const [form , setForm] = useState({
        company : '',
        jobDurationForm : "",
        jobDurationTo : "",
        jobExperience : ""
    })

    const {mutate , isPending , isSuccess} = useMutation({
        mutationKey : ['add work experience'],
        mutationFn : (data) => onCreate(`https://mern-cv-builder.onrender.com/api/post/create/resume/add-work-experience/${id}` , data)
    })

    const inputList = [
        {
            label : 'Company name',
            name : 'company',
            value: 'company',
            placeholder : "Enter company name..",
            size : "col-span-2"
        },
        {
            name : 'jobDurationForm',
            value: 'jobDurationForm',
            placeholder : "Enter joining date..",
            label : 'Joining Date'
        },
        {
            name : 'jobDurationTo',
            value: 'jobDurationTo',
            placeholder : "Enter rezoning date..",
            label : "Resignation Date"
        },
        {
            name : 'jobExperience',
            value: 'jobExperience',
            placeholder : "Enter experience..",
            label : "Add Experience details",
            size : "col-span-2"
        },
    ]

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
        <div className='p-5'>
            <section className="">
                <form className='' onSubmit={onSubmit}>
                    <div className='grid grid-cols-2 gap-3'>
                        {inputList.map((ele) => (
                            <div key={ele.name} className={` ${ele.size}  mb-5`}>
                                <Label 
                                    htmlFor="email"
                                    className = {`uppercase text-stone-600 dark:text-stone-300 text-[1rem] block mb-3`}
                                    >
                                    {ele.label} <span className=' text-red-500'>*</span>
                                </Label>
                                { ele.name == 'jobExperience' ? (
                                    <Textarea
                                        type = {ele.type}
                                        name = {ele.name}
                                        placeholder  = {ele.placeholder}
                                        value = {form[ele.value]}
                                        onChange = {onChange}
                                        className = {` outline-none h-[10rem] dark:bg-stone-500 dark:placeholder:text-stone-300`}
                                        required
                                    >
                                    </Textarea>
                                    ) : (<Input 
                                        type = {ele.type}
                                        name = {ele.name}
                                        placeholder  = {ele.placeholder}
                                        value = {form[ele.value]}
                                        onChange = {onChange}
                                        className = "border text-[1rem] rounded-md dark:bg-stone-500 dark:placeholder:text-stone-300 "
                                        required
                                    />)
                                }
                            </div>
                        ))}
                    </div>
                    <Button variant = "ghost" className = "mt-5">
                        {isPending ? (
                            <Spinner/>
                        ) : (
                            <>
                                <h3>
                                    Next 
                                </h3>
                                <ChevronRight className=' h-5 w-5' />
                            </>
                            )
                        }
                    </Button>
                </form>
            </section>
        </div>
    )
}
