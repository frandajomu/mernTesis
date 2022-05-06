import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetMyPerfil = () => {
    const [usuario, setPerfil] = useState(null)

    const MyPerfil = async () => {
        try {
            const res = await axios.get('/api/login/userInfo');
            setPerfil(res.data.user)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        MyPerfil();
    }, [])

    return [usuario, MyPerfil];
}

export default useGetMyPerfil;