import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const userCredentials = {};

const Login = () => {
    const { login } = useAuth();
    const location = useLocation();
    console.log(location);

    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col d-flex justify-content-center mb-5'>
                <button className="btn btn-primary" onClick={() => login(userCredentials, location.state?.from)}> Login </button>
                </div>
            </div>
        </div>
    );
}

export default Login;