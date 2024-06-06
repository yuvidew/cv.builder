import { TheRCCard } from '@/components/TheRCCard'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { useCreate } from '@/hook/useCreate'
import { useQuery } from '@tanstack/react-query'
import { FileText } from 'lucide-react'
import React from 'react'

const id = JSON.parse(localStorage.getItem('cv_user'))

export const Container = () => {
    const {fetchData} = useCreate()
    const {data , isPending } = useQuery({
        queryKey : ["fetch all Resumes"],
        queryFn : () => fetchData(`https://mern-cv-builder.onrender.com/api/get/resumes/${id._id}`)
    })


    return (
        <section className=' container my-5'>
            <h1 className=' text-blue-500 text-[1.4rem]'>See your resume</h1>
            
            <div className=' grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 mt-5'>
                {isPending ? (
                    [1 ,2 ,3 ,4 ,5 ,6].map((ele) => (
                        <Skeleton key={ele} className={'h-[20rem]'} />
                    ))
                ) : data.map((ele) => (
                    <TheRCCard key={ele._id} ele = {ele} />
                ))}

            </div>
        </section>
    )
}
