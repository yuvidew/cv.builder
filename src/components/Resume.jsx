import { useCreate } from '@/hook/useCreate';
import { useQuery } from '@tanstack/react-query';
import { Mail, MapPin, Phone } from 'lucide-react';
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from './ui/Spinner';
import darkImg from '@/assets/failed-dark.png'
import lightImg from '@/assets/failed.png'
import { ResumeCoverHeader } from './ResumeCoverHeader';
import { Footer } from './Footer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const Resume = () => {
    const {fetchData} = useCreate()
    const {id} = useParams()
    const resumeRef = useRef()

    const {data , isPending , isError} = useQuery({
        queryKey : ['fetch data by ' , id],
        queryFn : () => fetchData(`https://mern-cv-builder.onrender.com/api/get/resume/${id}`)
    })

    if(isPending){
        return (
            <div className=' h-[100vh] w-full flex items-center bg-stone-800 justify-center'>
                <Spinner size={'md'} />
            </div>
        )
    }


    if(isError){
        return(
            <div className=' h-[100vh] w-full bg-stone-800 flex items-center justify-center' >
                <div>
                    <img className=' dark:hidden block lg:h-[7rem] lg:w-[7rem] h-[5rem] w-[5rem] object-contain' src={darkImg} />
                    <img className=' dark:block hidden lg:h-[7rem] lg:w-[7rem] h-[5rem] w-[5rem] object-contain' src={lightImg} />
                </div>
            </div>
        )
    }

    const onDownload = () => {
        const content = resumeRef.current;

        // Create a new jsPDF instance
        const pdf = new jsPDF();

        // Render the div content to an image using html2canvas
        html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0);

        // Save the PDF
        pdf.save('download.pdf');
    });
    };

    return (
        <div className=' dark:bg-stone-800'>
            <ResumeCoverHeader onDownload = {onDownload} url = {'/dashboard/resume'} />
            <div  className=' container w-[55%] m-auto py-[2rem]'>
                <div ref={resumeRef} className='w-[210mm] h-[297mm]  py-10 px-8 bg-white text-black'>
                    <section className=' flex items-start gap-3  w-full mb-[2rem]'>
                        <div className=' h-full flex flex-col items-start justify-start  w-[70%]'>
                            <h1 className=' lg:text-[2.5rem] text-[2rem] font-bold capitalize'>{data.name} </h1>
                            <a href={data.linkedin} className='lg:text-[.8rem] text-blue-600 text-[.66rem]'>{data.linkedin}</a>
                        </div>
                        <div className=' h-full flex items-start justify-end w-[30%] '>
                            <ul className=' w-full'>
                                <li className=' flex items-center gap-2 mb-2'>
                                    <Phone className=' lg:h-5 lg:w-5 h-4 w-4 opacity-55' />
                                    <span className='lg:text-[.9rem] text-[.8rem]'>{data.number}</span>
                                </li>
                                <li className=' flex items-center gap-2 mb-2'>
                                    <Mail className=' lg:h-5 lg:w-5 h-4 w-4 opacity-55' />
                                    <span className='lg:text-[.9rem] text-[.8rem]'>{data.email}</span>
                                </li>
                                <li className=' flex items-center gap-2 mb-2'>
                                    <MapPin className=' lg:h-5 lg:w-5 h-4 w-4 opacity-55' />
                                    <span className='lg:text-[.9rem] text-[.8rem]'>{data.city} , {data.state}</span>
                                </li>
                                
                            </ul>
                        </div>
                    </section>
                    <section className=' flex items-start gap-1'>
                        <div className='w-[28%] '>
                            <div className=' mb-5'>
                                <h1 className=' lg:font-bold font-medium capitalize lg:text-[1.1rem]  text-[1rem] mb-4'>Eduction</h1>
                                {
                                    data.education.map((ele) => (
                                        <div className=' mb-4'>
                                            <h5 className=' lg:text-[.8rem] text-[.69rem]  opacity-75 mb-1'>Year | {ele.year}</h5>
                                            <p className='lg:text-[1rem] text-[.8rem]'>{ele.instituteCollage}</p>
                                            <span className='lg:text-[.9rem] text-[.7rem]'>{ele.city} , {ele.state}</span>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className=' mb-5'>
                                <h1 className=' lg:font-bold font-medium capitalize lg:text-[1.1rem]  text-[1rem] mb-4'>Skills</h1>
                                <ul className=' list-disc ml-4 '>
                                    {
                                        data.skills.map(ele => (
                                            <li key={ele} className=' lg:text-[1rem] text-[.8rem] capitalize mb-1'>
                                                {ele}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className=' w-[74%] px-5 border-l-[.14rem] border-stone-600'>
                            <div className=' mb-4'>
                                <h1 className='lg:font-bold font-medium capitalize lg:text-[1.1rem]  text-[1rem] mb-4'>Career Objective</h1>
                                <p className='lg:text-[.9rem] text-[.7rem]'>{data.objective}</p>
                            </div>
                            <div  className=' mb-4'>
                                <h1 className=' lg:font-bold font-medium capitalize lg:text-[1.1rem]  text-[1rem] mb-4'>Experience</h1>
                                <div className=' mt-3'>
                                    {data.working.map((ele) => (
                                        <div className=' mb-3'>
                                            <h3 className='font-medium capitalize text-[1.2rem] '>{ele.company}</h3>
                                            <p className=' mt-1 text-[.8rem] '>{ele.jobDurationForm} - {ele.jobDurationTo}</p>
                                            <p className=' text-[.8rem] mt-3'>{ele.jobExperience}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div  className=' mb-4'>
                                <h1 className=' lg:font-bold font-medium capitalize lg:text-[1.1rem]  text-[1rem] mb-4'>Projects</h1>
                                <div className=' mt-3'>
                                    {data.projects.map((ele) => (
                                        <div className=' mb-3'>
                                            <h3 className='font-medium capitalize text-[1.1rem] '>{ele.projectName}</h3>
                                            <p className=' mt-1 text-[1rem] '>{ele.projectStart} - {ele.projectEnd}</p>
                                            <p className=' text-[.9rem] mt-3'>{ele.projectDetails}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className=' container'>
            <Footer/>
            </div>
            <br />
        </div>
    )
}
