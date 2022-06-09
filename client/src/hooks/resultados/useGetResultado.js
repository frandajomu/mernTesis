import axios from 'axios';
import { useEffect, useState } from 'react'

export default function useGetResultado({ id }) {
    const [resultado, setResultado] = useState({});
    useEffect(() => {
        const ResultadoData = async () => {
            const res = await axios.get(`/api/resultados/${id}`)
            setResultado(res.data)
        }
        if (id !== undefined) {
            ResultadoData();
        }
    }, [id])

    return [resultado];
}