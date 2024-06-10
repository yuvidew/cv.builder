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
            <div className=' container w-[55%] m-auto py-[2rem]'>
                <div ref={resumeRef} className='w-[210mm] h-[297mm]  py-10 px-8 bg-white text-black'>
                    <section className=' flex items-center justify-between'>
                        <div>
                            <h1 className=' lg:text-[2rem] text-[2rem] font-bold capitalize'>{data.name} </h1>
                            <p>{data.profession}</p>

                            
                        </div>
                    </section>
                </div>
            </div>
            <div className=' container'>
                <Footer/>
                <br />
            </div>
        </div>
    )
}
