import { useEffect, useState } from 'react'
import axios from 'axios';

export default function useGetLine(dataEstadistica) {
    const [dataLine, setdataLine] = useState([]);
    const LineGraphs = async () => {
        try {
            const res = await axios.post('/api/resultados/estaLin', dataEstadistica)
            if (res.data.error) {
                return res.data = 0;
            } else {
                setdataLine(res.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        LineGraphs();
         // eslint-disable-next-line
    }, [])

    return [dataLine];
}
