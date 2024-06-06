import { TheRCCard } from '@/components/TheRCCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useCreate } from '@/hook/useCreate'
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const id = JSON.parse(localStorage.getItem('cv_user'))

export const Container = () => {
    const {fetchData} = useCreate();
    const {data , isPending , isError} = useQuery({
        queryKey : ['fetch cover letters'],
        queryFn : () => fetchData(`https://mern-cv-builder.onrender.com/api/get/all/cover-letter/${id._id}`)
    })

    return (
        <div className='container mt-3'>
            <h1 className=' text-blue-500 text-[1.4rem] mt-4'> 
                See your Cover Letter
            </h1>

            <div className=' grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3 mt-5'>
                {isPending ? (
                    [1 ,2 ,3 ,4 ,5].map((ele) => (
                        <Skeleton key={ele} className={'h-[20rem]'}  />
                    ))
                    ):
                    (
                        data.map((ele) => (
                            <TheRCCard key={ele._id} ele={ele} />
                        ))
                    )
                }
            </div>
        </div>
    )
}
