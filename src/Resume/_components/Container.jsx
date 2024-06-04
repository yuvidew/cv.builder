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
    const {data , isPending , isError} = useQuery({
        queryKey : ["fetch all Resumes"],
        queryFn : () => fetchData(`https://mern-cv-builder.onrender.com/api/get/resumes/${id._id}`)
    })

    console.log(data);

    return (
        <section className=' container my-5'>
            <div className=' grid grid-cols-4 gap-3'>
                {isPending ? (
                    [1 ,2 ,3 ,4 ,5 ,6].map((ele) => (
                        <Skeleton key={ele} className={'h-[20rem]'} />
                    ))
                ) : data.map((ele) => (
                    <Card key={ele._id} className={'h-[20rem] bg-stone-100 dark:bg-stone-600 '}>
                        <CardContent className = "py-3 h-full">
                            <div className=' h-[60%]  flex items-center justify-center'>
                                <FileText className=' h-[6rem] w-[6rem] m-auto text-green-500' />
                            </div>
                            <div className=' flex items-center justify-between pt-5'>
                                <CardTitle className = "text-[1.2rem] font-medium ">{ele.resumeName}</CardTitle>
                                <p className=' text-stone-400'>{ele.completePercentage}%</p>
                            </div>
                            <Progress className = "h-[.8rem] mt-[1rem]" value = {ele.completePercentage} />
                        </CardContent>
                    </Card>
                ))}

            </div>
        </section>
    )
}
