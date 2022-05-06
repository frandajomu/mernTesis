import { useEffect, useState } from 'react'
import axios from 'axios';

export default function useGetPacientes(dataEstado) {
    const [listaPacientes, setlistaPacientes] = useState([]);
    const dataPacientes = async () => {
        try {
            const res = await axios.post('/api/usuarios/pacientes', dataEstado)
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                setlistaPacientes(res.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        dataPacientes();
    }, [])

    return [listaPacientes, dataPacientes];
}


