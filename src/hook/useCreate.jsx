import axios from 'axios'
import { enqueueSnackbar } from 'notistack';

export const useCreate = () => {

    const onCreate = async (url , data) => {
        try {
            const res = await axios.post(url , data);
            if(res.status == 201){
                enqueueSnackbar(res.data.msg , { variant : "success"})
            }
        } catch (error) {
            enqueueSnackbar(res.data.msg , { variant : "error"})
        }
    }

    const fetchData = async (url) => {
        try {
            const res = await axios.get(url);

            return res.data
        } catch (error) {
            enqueueSnackbar(res.data.msg , { variant : "error"})
        }
    }

    const deleteById = async (url) => {
        try {
            const res = await axios.delete(url);
            if(res.status == 201){
                enqueueSnackbar(res.data.msg , { variant : "success"})
            }
        } catch (error) {
            enqueueSnackbar(res.data.msg , { variant : "error"})
        }
    }

    return {onCreate , fetchData , deleteById}
}
