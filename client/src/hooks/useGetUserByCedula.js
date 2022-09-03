import axios from 'axios';

export default function useGetUsuarioByCedula() {
    const UsuarioData = async ({ id }) => {
        const res = await axios.get(`/api/usuarios/cedula/${id}`);
        return res.data
    }

    return [UsuarioData];
}