import axios from 'axios';

export default function useGetTurno() {
    const turnoInfo = async (dataCita) => {
        try {
            const res = await axios.post('/api/citas/turno', dataCita)
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                return res.data
            }
        } catch (e) {
            console.log(e)
        }
    }

    const turnoDeseable = async () => {
        try {
            const res = await axios.get('/api/citas/turno')
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                return res.data
            }
        } catch (e) {
            console.log(e)
        }
    }
    return [turnoInfo, turnoDeseable];
}