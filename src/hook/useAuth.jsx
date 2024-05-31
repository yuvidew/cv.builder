import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
    const navigate = useNavigate()
    const [isTrue , setIsTrue] = useState(false)
    const onAuth = async (url , data) => {
        try {
            const res = await axios.post(url , data)

            if(res.status == 200){
                enqueueSnackbar(res.data.msg , {variant : 'success'})
                setIsTrue(true)
            }else if(res.status == 201){
                enqueueSnackbar(res.data.msg , {variant : 'success'})
                localStorage.setItem('cv_user_token' , res.data.auth)
                localStorage.setItem('cv_user' , JSON.stringify(res.data.user))
                navigate('/dashboard')
            }else if(res.status == 404){
                enqueueSnackbar(res.data.msg , {variant : "error"})
            }else if(res.status == 400){
                enqueueSnackbar(res.data.msg , {variant : "warning"})
            }else if(res.status == 401){
                enqueueSnackbar(res.data.msg , {variant : "error"})
            }
        } catch (error) {
            enqueueSnackbar("Failed to create account" , {variant : "error"})
        }
    }
    return [isTrue , onAuth]
}
