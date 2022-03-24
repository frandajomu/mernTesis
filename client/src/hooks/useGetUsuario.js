import axios from 'axios';
import { useEffect, useState } from 'react'

export default function useGetUsuario({ id }) {
    const [usuario, setUsuario] = useState({});
    useEffect(() => {
        const UsuarioData = async () => {
            const res = await axios.get(`/api/usuarios/${id}`)
            setUsuario(res.data)
        }
        if (id !== undefined) {
            UsuarioData();
        }
    }, [id])

    return [usuario];
}