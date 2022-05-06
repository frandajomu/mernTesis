import axios from 'axios';
import { useEffect, useState } from 'react'

export default function useGetOneCita({ id }) {
    const [cita, setcita] = useState({});
    useEffect(() => {
        const CitaData = async () => {
            const res = await axios.get(`/api/citas/${id}`)
            setcita(res.data)
        }
        if (id !== undefined) {
            CitaData();
        }
    }, [id])

    return [cita];
}