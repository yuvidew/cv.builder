import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ResumeCoverHeader } from './ResumeCoverHeader'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useCreate } from '@/hook/useCreate';
import { useQuery } from '@tanstack/react-query';
import Spinner from './ui/Spinner';
import darkImg from '@/assets/failed-dark.png'
import lightImg from '@/assets/failed.png'
import { Footer } from './Footer';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Cover = () => {
    const {fetchData} = useCreate()
    const {id} = useParams()
    const resumeRef = useRef()

    const {data , isPending , isError} = useQuery({
        queryKey : ['fetch data by ' , id],
        queryFn : () => fetchData(`https://mern-cv-builder.onrender.com/api/get/cover-letter/${id}`)
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
            <div className=' h-[100vh] w-full flex items-center justify-center bg-stone-800' >
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
            <ResumeCoverHeader onDownload={onDownload} url={'/dashboard/cover-letter'} />
            <div className=' container sm:px-3  flex items-center justify-center mt-[2rem]'>
                <div ref={resumeRef} className='lg:w-[210mm] md:w-[170mm] sm:w-[150mm] w-full m-auto lg:h-[250mm] md:h-[240mm] sm:h-[180mm] h-[170mm] py-5 px-4 bg-white text-black'>
                    <section className=' flex items-start justify-between'>
                        <div className='w-[60%]'>
                            <h1 className=' text-[1.3rem]  font-bold capitalize'>{data.name} </h1>
                            <p className=' text-[.7rem] text-blue-600 mt-1'>{data.profession}</p>

                            <div className=' mt-3'>
                                <span className=' text-[.8rem] text-stone-500'>To,</span>
                                <p className=' text-[.8rem]' >{data.position}</p>
                                <p className=' text-[.8rem]' >{data.companyName}</p>
                                <p className=' text-[.8rem]' >{data.streetAddress}</p>
                                <p className=' text-[.8rem]' >{data.companyCity} , {data.companyState} , {data.companyZipCode}</p>
                            </div>
                        </div>
                        <div className='w-[40%]'>
                            <ul>
                                <li className=' flex items-center justify-end  mb-2 gap-2'>
                                    <span className=' text-[.7rem]'>
                                        {data.email} 
                                    </span>
                                    <Mail className='h-[.8rem] w-[.8rem] text-blue-600'/>
                                </li>
                                <li className=' flex items-center justify-end mb-2  gap-2'>
                                    <span className=' text-[.7rem]'>
                                        {data.number} 
                                    </span>
                                    <Phone className='h-[.8rem] w-[.8rem] text-blue-600'/>
                                </li>
                                <li className=' flex items-center justify-end mb-2  gap-2'>
                                    <span className=' text-[.7rem]'>
                                        {data.city} , {data.state} {data.zipCode}
                                    </span>
                                    <MapPin className='h-[.8rem] w-[.8rem] text-blue-600'/>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className=' mt-[2rem]'>
                        <p className='text-[.9rem]'>Dear {data.position},</p>

                        <p className=' mt-3 text-[.9rem]'>{data.letterText}</p>
                    </section>
                    <section className=' mt-[3rem] text-[.9rem]'>
                        <p>Sincerely</p>
                        <h3 className=' font-medium'>{data.name}</h3>
                    </section>
                </div>
            </div>
            <br />
            <br />
            <div className=' container pb-2'>
                <Footer/>
                <br />
            </div>
        </div>
    )
}
