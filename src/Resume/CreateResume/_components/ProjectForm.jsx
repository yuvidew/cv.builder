import Spinner from '@/components/ui/Spinner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCreate } from '@/hook/useCreate'
import { useMutation } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
const id = localStorage.getItem('resumeId')

export const ProjectForm = () => {
    const {onCreate} = useCreate()
    const [form , setForm] = useState({
        projectName : '',
        projectDetails : "",
        projectStart : "",
        projectEnd : "",
    })

    const router = useParams()


    const {mutate , isPending } = useMutation({
        mutationKey : ['add work experience'],
        mutationFn : (data) => onCreate(`https://mern-cv-builder.onrender.com/api/post/create/resume/add-projects/${router.id}` , data)
    })

    const inputList = [
        {
            label : 'Project Name',
            name : 'projectName',
            value: 'projectName',
            placeholder : "Enter project name..",
            size : "col-span-2"
        },
        {
            type : 'date',
            name : 'projectStart',
            value: 'projectStart',
            placeholder : "Enter state date..",
            label : 'Starting Date'
        },
        {
            type : 'date',
            name : 'projectEnd',
            value: 'projectEnd',
            placeholder : "Enter End date..",
            label : "Ending Date"
        },
        {
            name : 'projectDetails',
            value: 'projectDetails',
            placeholder : "Enter project details..",
            label : "Add Project details",
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


    return (
        <div className=''>
            <section className=''>
                <form action="" onSubmit={onSubmit} >
                    <div className='grid grid-cols-2 gap-3'>
                        {inputList.map((ele) => (
                            <div key={ele.name} className={` ${ele.size}  mb-5`}>
                                <Label 
                                    htmlFor="email"
                                    className = {`uppercase text-stone-600 dark:text-stone-300 text-[1rem] block mb-3`}
                                    >
                                    {ele.label} <span className=' text-red-500'>*</span>
                                </Label>
                                { ele.name == 'projectDetails' ? (
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
