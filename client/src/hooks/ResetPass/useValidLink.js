import axios from 'axios';

export default function useValidLink() {
    const validLink = async (formData) => {
        const res = await axios.post(`/api/login/validarLink`, formData);
        return res.data
    }
    return [validLink];
}