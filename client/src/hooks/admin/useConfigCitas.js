import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useConfigCitas() {
    const [params, setParams] = useState([])
    const GetGlobalParams = async () => {
        const res = await axios.get('/api/citas/globalParams');
        setParams(res.data)
    }
    useEffect(() => {
        GetGlobalParams()
    },[])

    const createGlobalParams = async (formData) => {
        try{
            const res = await axios.post('/api/citas/globalParams', formData);
            return res.data
        }catch (e) {
            console.log(e)
        }
    }

    const editGlobalParams = async (formData) => {
        try{
            const res = await axios.put('/api/citas/globalParams', formData);
            return res.data
        }catch (e) {
            console.log(e)
        }
    }
    return [params, createGlobalParams, editGlobalParams];
}