import axios from 'axios';

export default function useDeleteUsuario({ id }) {
    const DeleteUserData = async () =>{
        await axios.delete(`/api/usuarios/${id}`)
    }
    return [DeleteUserData];
}