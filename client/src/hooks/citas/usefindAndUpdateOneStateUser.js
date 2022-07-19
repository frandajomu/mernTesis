import axios from "axios";

export default function usefindAndUpdateOneStateUser() {
    const EditEstadoPaciente = async (dataEstado, {id}) => {
        const res = await axios.put(`/api/usuarios/cedula/${id}`, dataEstado);
        return res.data
    }

    return [EditEstadoPaciente];
}