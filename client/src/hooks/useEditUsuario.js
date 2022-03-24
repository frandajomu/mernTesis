import axios from "axios";

export default function useEditUsuario() {
    const EditUserData = async (formData, {id}) => {
        const res = await axios.put(`/api/usuarios/${id}`, formData);
        return res.data
    }
    return [EditUserData];
}