import axios from 'axios';

export default function useUploadResultados() {
    const UploadResultados = async (formData) => {
        const res = await axios.post(`/api/resultados`, formData);
        return res.data
    }

    const EditPacienteData = async (formData, {id}) => {
        const res = await axios.put(`/api/usuarios/pacientes/${id}`, formData);
        return res.data
    }
    return [UploadResultados, EditPacienteData];
}