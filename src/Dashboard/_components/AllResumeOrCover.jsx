import { TheRCCard } from '@/components/TheRCCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useCreate } from '@/hook/useCreate'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export const AllResumeOrCover = ({
    url,
    type
}) => {
    const {fetchData} = useCreate()
    const {data , isPending } = useQuery({
        queryKey : [`fetch all ${type}`],
        queryFn : () => fetchData(url)
    })
    return (
        <div className=' mt-5'>
            <section className=' grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-3 mt-[2rem]'>
                {isPending ? (
                    [1 ,2 ,3 ,4 ,5 ,6].map((ele) => (
                        <Skeleton key={ele} className={'h-[20rem]'} />
                    ))
                ) : data != undefined && data.map((ele) => (
                    <TheRCCard key={ele._id} ele = {ele} />
                ))}

            </section>
        </div>
    )
}
