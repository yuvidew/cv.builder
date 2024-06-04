import { useCreate } from '@/hook/useCreate'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from '@/components/ui/skeleton'
import {Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/Spinner'


const id = localStorage.getItem('resumeId')

export const ProjectList = ({
    formType,
    onAddType
}) => {
    const {fetchData , deleteById} = useCreate()

    const {data , isLoading , isError} = useQuery({
        queryKey : ['get project list'],
        queryFn : () => fetchData(`http://localhost:2000/api/get/create/resume/get-projects/${id}`)
    })

    const {mutate , isPending , isSuccess} = useMutation({
        mutationKey : ['get delete project'],
        mutationFn : (projectName) => deleteById(`http://localhost:2000/api/delete/resume/delete-project/${id}/${projectName}`)
    })

    if(isSuccess){
        onAddType(formType)
    }


    return (
        <div className=' px-4'>
            <Accordion type="single" collapsible>
            {isLoading ? (
                <Skeleton className={'h-[5rem]'} />
            ) : (
                data.map(ele => (
                    <AccordionItem value={ele._id} className = "mt-5 bg-stone-700 rounded-md px-5">
                        <AccordionTrigger>
                            <h3>{ele.projectName}</h3>
                        </AccordionTrigger>
                        <AccordionContent className = "mt-5 ">
                            <div className=' flex items-center justify-between'>
                                <p>
                                Project Duration - 
                                    {" "}<span className=' text-stone-400'>{ele.projectStart}</span>
                                    {" "} - {" "}
                                    <span className=' text-stone-400'>{ele.projectEnd}</span>
                                </p>
                                <Button variant = "ghost">
                                    {isPending ? (
                                        <Spinner/>
                                    ) : (

                                        <Trash2 
                                            className='h-5 w-5 cursor-pointer' 
                                            size='sm' 
                                            onClick = {() => mutate(ele.projectName)}
                                        />
                                    )}
                                </Button>
                                
                            </div>

                            <p className='mt-3'>
                                {ele.projectDetails}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))
            )}
            </Accordion>
            <Button variant = "ghost" className = "mt-[3rem]">
                Add All project
            </Button>
        </div>

    )
}
