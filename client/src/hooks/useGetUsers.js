import { useEffect, useState } from 'react'
import axios from 'axios';

const useGetUsers = () => {
    const [listaUser, setListaUser] = useState([]);

    const dataUsers = async () => {
        try {
            const res = await axios.get('/api/usuarios')
            setListaUser(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        dataUsers();
    }, [])

    return [listaUser, dataUsers];
}

export default useGetUsers;