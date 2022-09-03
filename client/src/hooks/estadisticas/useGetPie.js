import { useEffect, useState } from 'react'
import axios from 'axios';

export default function useGetPie(dataEstadistica) {
    const [dataPie, setdataPie] = useState([]);
    const PieGraphs = async () => {
        try {
            const res = await axios.get('/api/resultados/estaPie', dataEstadistica)
            if (res.data.error) {
                return res.data = 0;
            } else {
                setdataPie(res.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        PieGraphs();
         // eslint-disable-next-line
    }, [])

    return [dataPie];
}
