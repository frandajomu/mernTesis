import axios from 'axios';

export default function useCreateInicialAdmin() {
    const UploadUserData = async (formData) => {
        const res = await axios.post('/api/usuarios/adminCreate', formData);
        return res.data
    }

    return [UploadUserData];
}