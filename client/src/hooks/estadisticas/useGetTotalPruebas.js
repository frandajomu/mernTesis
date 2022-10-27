import { useEffect, useState } from 'react'
import axios from 'axios';

export default function useGetTotalPruebas(dataEstadistica) {
    const [dataTotalPruebas, setdataTotalPruebas] = useState([]);
    const TotalPruebasGraphs = async () => {
        try {
            const res = await axios.get('/api/resultados/', dataEstadistica)
            if (res.data.error) {
                return res.data = 0;
            } else {
                setdataTotalPruebas(res.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        TotalPruebasGraphs();
         // eslint-disable-next-line
    }, [])

    return [dataTotalPruebas];
}
