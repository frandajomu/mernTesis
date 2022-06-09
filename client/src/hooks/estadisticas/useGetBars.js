import { useEffect, useState } from 'react'
import axios from 'axios';

export default function useGetBars(dataEstadistica) {
    const [dataBar, setdataBar] = useState([]);
    const BarsGraphs = async () => {
        try {
            const res = await axios.post('/api/resultados/estaBar', dataEstadistica)
            if (res.data.error) {
                return res.data = 0;
            } else {
                setdataBar(res.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        BarsGraphs();
         // eslint-disable-next-line
    }, [])

    return [dataBar];
}
