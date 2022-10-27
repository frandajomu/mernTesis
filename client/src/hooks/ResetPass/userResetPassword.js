import axios from 'axios';

export default function userResetPassword() {
    const resetPass = async (formData) => {
        const res = await axios.post(`/api/login/forgetPass`, formData);
        return res.data
    }
    return [resetPass];
}