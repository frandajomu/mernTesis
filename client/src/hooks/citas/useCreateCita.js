import axios from 'axios';
 
export default function useCreateCita() {
    const CreateCita = async (formData) => {
        const res = await axios.post(`/api/citas`, formData);
        return res.data
    }
    return [CreateCita];
}