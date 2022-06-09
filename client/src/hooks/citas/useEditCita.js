import axios from "axios";

export default function useEditCita() {
    const EditCitaData = async (datedb, {id}) => {
        const res = await axios.put(`/api/citas/${id}`, datedb);
        return res.data
    }
    return [EditCitaData];
}