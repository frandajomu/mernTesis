import axios from "axios";

export default function useEditResultado() {
    const EditResultadoData = async (formData, {id}) => {
        const res = await axios.put(`/api/resultados/${id}`, formData);
        return res.data
    }
    return [EditResultadoData];
}