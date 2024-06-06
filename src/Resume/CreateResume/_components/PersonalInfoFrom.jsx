import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useCreate } from '@/hook/useCreate'
import { useMutation } from '@tanstack/react-query'
import Spinner from '@/components/ui/Spinner'
import { useParams } from 'react-router-dom'


export const PersonalInfoFrom = ({
  formType,
  onAddType
}) => {
  const {onCreate} = useCreate()
  const [form , setForm] = useState({
    name : '',
    email : '',
    number :'',
    linkedin : '',
    city : "",
    state : '',
    objective : ''
  })

  const router = useParams()

  const {mutate , isPending , isSuccess} = useMutation({
    mutationKey : ['add personal info'],
    mutationFn : (data) => onCreate(`https://mern-cv-builder.onrender.com/api/post/create/resume/add-personal-info/${router.id}` , data)
  })
  const inputList = [
    {
      type : "text",
      name : 'name',
      placeholder : 'Enter name..',
      value : 'name'
    },
    {
      type :'email',
      name : 'email',
      placeholder : 'Enter email..',
      value : 'email'
    },
    {
      type : "number",
      name : 'number',
      placeholder : 'Enter phone number..',
      value : 'number'
    },
    {
      type : "text",
      name : 'linkedin',
      placeholder : 'Enter linkedin id..',
      value : 'linkedin'
    },
    {
      type : "text",
      name : 'city',
      placeholder : 'Enter city..',
      value : 'city'
    },
    {
      type : "text",
      name : 'state',
      placeholder : 'Enter state..',
      value : 'state'
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
    <div className=' p-5'>
      <form className='' onSubmit={onSubmit}>
        <div className='grid lg:grid-cols-2 gap-3'>
            {inputList.map((ele) => (
              <div key={ele.name} className=' mb-5'>
                <Label 
                  htmlFor="email"
                  className = " uppercase text-stone-600 dark:text-stone-300 text-[1rem] block mb-3"
                >
                  {ele.name} <span className=' text-red-500'>*</span>
                </Label>
                <Input 
                  type = {ele.type}
                  name = {ele.name}
                  placeholder  = {ele.placeholder}
                  value = {form[ele.value]}
                  onChange = {onChange}
                  className = "border text-[1rem] rounded-md dark:bg-stone-500 dark:placeholder:text-stone-300 "
                  required
                />
              </div>
            ))}

            <div className=' col-span-2'>
              <Label 
                htmlFor = "objective"
                className = " uppercase text-stone-600 dark:text-stone-300 text-[1rem] block mb-3"
              >
                  Career Objective  <span className=' text-red-500'>*</span>
              </Label>
              <Textarea 
                className = "outline-none h-[10rem] dark:bg-stone-500 dark:placeholder:text-stone-300" 
                value = {form.objective}
                name = "objective"
                placeholder = "Enter your objective"
                onChange = {onChange}
              />
            </div>
        </div>
        <div className=' '>
          <Button variant = "ghost" className = "mt-4">
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
        </div>
      </form>
    </div>
  )
}
