import axios from 'axios';

export default function userDeleteMyPerfil() {
    const DeleteMyPerfil = async () =>{
        const res = await axios.delete(`/api/login/userInfo`)
        return res.data
    }
    return [DeleteMyPerfil];
}