import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Key, Mail, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import Spinner from '@/components/ui/Spinner'


export const SignUp = ({
    onAuth
}) => {
    const [isOpen , setIsOpen] = useState(false)
    const [form , setForm] = useState({
        name : '',
        email : '',
        password : ''
    })

    const {mutate , isPending} = useMutation({
        mutationKey : ["sign up"],
        mutationFn : (data) => onAuth('https://mern-cv-builder.onrender.com/api/post/signup' , data)
    })

    const onChange = (e) => {
        const {name , value} = e.target;

        setForm({
            ...form , 
            [name] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        mutate(form)
    }



    return (
        <div>
            <form action="" className=' mt-4' onSubmit={handleSubmit} >
                <div className=' flex items-center border-b border-b-stone-900 mt-4 dark:border-b-white'>
                    <User/>
                    <Input 
                        name = "name"
                        value = {form.name}
                        onChange = {onChange}
                        placeholder = "Enter username.." 
                        className = "bg-transparent " 
                        required
                    />
                </div>
                <div className=' flex items-center border-b border-b-stone-900 mt-4 dark:border-b-white'>
                    <Mail/>
                    <Input 
                        name = "email"
                        value = {form.email}
                        onChange = {onChange}
                        placeholder = "Enter email.." 
                        className = "bg-transparent " 
                        required
                    />
                </div>
                <div className=' flex items-center border-b border-b-stone-900 mt-[1.5rem] dark:border-b-white'>
                    <Key/>
                    <Input 
                        name = "password"
                        value = {form.password}
                        onChange = {onChange}
                        type = {isOpen ? "text" : 'password'}
                        placeholder = "Enter password.." 
                        className = "bg-transparent " 
                        required
                    />
                    {isOpen ? (
                        <Eye onClick={() => setIsOpen(!isOpen)} className=' cursor-pointer' />
                    ) : (
                        <EyeOff onClick={() => setIsOpen(!isOpen)} className=' cursor-pointer' />
                    )}
                </div>

                <Button variant = "ghost" type = 'submit' className = "w-full mt-[1.8rem]">
                    {isPending ? <Spinner color = "text-white" /> : 'Submit'}
                </Button>
                <p className=' mt-5 text-stone-600 dark:text-stone-100'>
                    Already you have a account ?
                </p>
            </form>
        </div>
    )
}
