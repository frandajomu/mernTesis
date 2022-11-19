import axios from 'axios';

export default function useContactHelp() {
    const ContactHelp = async (formData) => {
        const res = await axios.post(`/api/login/helpContact`, formData);
        return res.data
    }
    return [ContactHelp];
}