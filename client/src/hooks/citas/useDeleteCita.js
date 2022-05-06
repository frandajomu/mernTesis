import axios from 'axios';

export default function useDeleteCita({ id }) {
    const DeleteCitaData = async () =>{
        const res = await axios.delete(`/api/citas/${id}`)
        return res.data
    }
    return [DeleteCitaData];
}