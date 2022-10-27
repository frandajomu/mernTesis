import axios from 'axios';

export default function userUpdatePassword() {
    const changePass = async (formData) => {
        const res = await axios.put(`/api/login/forgetPass`, formData);
        return res.data
    }
    return [changePass];
}