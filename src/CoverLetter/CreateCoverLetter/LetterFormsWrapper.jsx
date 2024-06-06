import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import React, { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PersonalInfoFrom } from './_components/PersonalInfoFrom'
import { EmployerInfoFrom } from './_components/EmployerInfoFrom'
import { LetterDesFrom } from './_components/LetterDesCompFrom'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export const LetterFormsWrapper = ({
    setTitle
}) => {
    const [formType , setFormType] = useSearchParams({
        q:'personal-info.',
        onlyComputer : true
    })

    const select = formType.get('q')

    const onSelect = (text) => {
        setFormType(prev => {
            prev.set('q' , text)
            return prev
        } , {replace : true})
    }
    
    const btnList = [
        {
            text : 'Personal Info.',
            url : 'personal-info.',
            comp : <PersonalInfoFrom onAddType={onSelect} formType={'employer-info.'} />
        },
        {
            text : 'Employer Information',
            url : 'employer-info.',
            comp : <EmployerInfoFrom onAddType={onSelect} formType={'letter-description'} />
        },
        {
            text : 'Letter Description',
            url : 'letter-description',
            comp : <LetterDesFrom  />
        },
    ]

    const theComp = useMemo(() => {
        return btnList.filter(ele => ele.url == select);
    } , [select])

    useEffect(() => {
        setTitle(select)
    } , [select])

    return (
        <>
            <section className='lg:hidden mt-[2rem]'>
                <Accordion type="single" collapsible >
                    {btnList.map(ele => (
                        <AccordionItem value={ele.url} key={ele.url} className={``}>
                            <AccordionTrigger 
                                className = 'w-[100%] border py-4'
                                key={ele.text} 
                                onClick = {() => onSelect(ele.url)}
                            >
                                {ele.text}
                            </AccordionTrigger>
                            <AccordionContent>
                                {theComp[0].comp }
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

            </section>
            <section className='lg:flex hidden items-start gap-2 mt-[2rem]'>
                <div className='w-[18%]'>
                    {btnList.map(ele => (
                        <Button 
                            variant = {select == ele.url && "ghost"}
                            key={ele.text} 
                            onClick = {() => onSelect(ele.url)}
                            className ="mt-5 w-full flex items-center justify-between text-[1rem] "
                        >
                            {ele.text}
                            <ChevronRight className=' h-5 w-5' />
                        </Button>
                    ))}
                </div>
                <div className=' w-[85%]'>
                    {theComp[0].comp }
                </div>
            </section>
        </>
    )
}
