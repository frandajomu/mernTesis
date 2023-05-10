import axios from "axios";
 
export default function useChangeState() {
    const EditEstadoPaciente = async (datedb, {id}) => {
        const res = await axios.put(`/api/usuarios/pacientes/${id}`, datedb);
        return res.data
    }
    const EditEstadoCita = async (dataID) => {
        const res = await axios.post('/api/citas/cancelar', dataID);
        return res.data
    }
    return [EditEstadoPaciente, EditEstadoCita];
}