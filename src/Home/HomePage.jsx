import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignIn } from './_components/SignIn'
import { ModeToggle } from '@/components/ui/ModeTogle'
import { SignUp } from './_components/SignUp'
import { Footer } from '@/components/Footer'
import { useAuth } from '@/hook/useAuth'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
    const [isTrue , onAuth] = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        if(localStorage.getItem('cv_user_token')){
            navigate('/dashboard')
        }
    } , [])

    return (
        <div className=' h-[100vh] dark:bg-stone-800 '>
            <div className=' container h-full'>
                <main className=' h-[5rem] flex items-center justify-between'>
                    <h1 className=' lg:text-[2rem] md:text-[1.5rem] text-[1.3rem] font-medium text-blue-600 dark:text-stone-100'>Cv.Builder</h1>
                    <ModeToggle/>
                </main>
                <section className=' h-[80%]  flex items-center justify-center'>
                    <div className=' w-[40rem]  m-auto h-[80%] my-auto'>
                        <h2 className=' text-center clear-start lg:text-[2rem] md:text-[1.8rem] text-[1.7rem] text-blue-600 font-medium'>
                            Welcome to Cv.Builder
                        </h2>
                        <p className=' text-center mt-3 text-stone-800 dark:text-stone-300'
                        >express way to create resume</p>
                        <div className=' lg:w-[40rem] md:w-[30rem] w-full  mt-[2rem] m-auto'>
                            <Tabs defaultValue={isTrue ? "signin" : "signup"} className="w-full">
                                <TabsList className = "w-full">
                                    <TabsTrigger value="signin" className = "w-full ">Sign In</TabsTrigger>
                                    <TabsTrigger value="signup" className = "w-full ">Sign Up</TabsTrigger>
                                </TabsList>
                                <TabsContent value="signin">
                                    <SignIn onAuth = {onAuth} />
                                </TabsContent>
                                <TabsContent value="signup">
                                    <SignUp onAuth = {onAuth} />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        </div>
    )
}

export default HomePage