import axios from 'axios';

export default function useGetUsuario() {
    const UploadUserData = async (formData) => {
        const res = await axios.post(`/api/usuarios`, formData);
        return res.data
    }
    return [UploadUserData];
}