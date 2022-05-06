import axios from "axios";

export default function userPutPassword() {
    const PutPassword = async (formData) => {
        const res = await axios.put(`/api/login/updatePass`, formData);
        return res.data
    }
    return [PutPassword];
}