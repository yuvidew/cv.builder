import Spinner from '@/components/ui/Spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreate } from '@/hook/useCreate'
import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'


export const SkillsForm = () => {
    const {onCreate} = useCreate() ;
    const router = useParams()
    console.log("objeasdft" , router.id);
    const [skills , setSkills] = useState([])
    const [text , setText] = useState('')

    const {mutate , isPending , isSuccess} = useMutation({
        mutationKey : ["add Skills"],
        mutationFn : (data) => onCreate( `https://mern-cv-builder.onrender.com/api/post/create/resume/add-skills/${router.id}` , data) 
    })

    const onSubmit = (e) => {
        e.preventDefault();
        setSkills(prev => [...prev , text])
        setText('')
    }

    const onDelete = (i) => {
        setSkills(ele => {
            const items = [...ele]
            items.splice(i , 1)
            return items
        })
    }

    const onPost = () => {
        mutate(skills)
    }


    return (
        <section className='py-7 mb-[5rem] h-[15rem]'>
            <form action="" onSubmit={onSubmit}>
                <Label htmlFor = "skills" className = {`uppercase text-stone-600 dark:text-stone-300 text-[1rem] block mb-3`}>
                    Skills
                </Label>
                <Input 
                    placeholder = "Enter your skills..." 
                    value = {text}
                    onChange = {(e) => setText(e.target.value)}
                    className = "border text-[1rem] rounded-md dark:bg-stone-500 dark:placeholder:text-stone-300 "
                    required
                />
            </form>
            <div className=' mt-5'>
                {skills.length !== 0 && skills.map((ele , index) => (
                    <Button 
                        key={index} 
                        size = "sm" 
                        variant = "ghost" 
                        onClick = {() => onDelete(index)}
                        className = "mr-3 mt-3 "
                    >
                        {ele} {" "} <X className=' h-5 w-5 ml-3' />
                    </Button>
                ))}
            </div>

            {skills.length >0 && (
                <Button 
                    variant = "ghost" 
                    className = "mt-5"
                    onClick = {onPost}
                >
                    {isPending ? (
                        <Spinner/>
                    ) : (
                        'Add Skills'
                    )}
                </Button>
            )}
        </section>
    )
}
