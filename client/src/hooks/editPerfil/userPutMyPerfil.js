import axios from "axios";

export default function userPutMyPerfil() {
    const PutMyPerfil = async (formData) => {
        const res = await axios.put(`/api/login/userInfo`, formData);
        return res.data
    }
    return [PutMyPerfil];
}