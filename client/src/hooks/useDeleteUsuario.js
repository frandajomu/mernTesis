import axios from 'axios';

export default function useDeleteUsuario({ id }) {
    const DeleteUserData = async () =>{
        const res = await axios.delete(`/api/usuarios/${id}`)
        return res.data
    }
    return [DeleteUserData];
}