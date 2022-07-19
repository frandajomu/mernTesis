import React from 'react';
import { Navigate } from 'react-router-dom';
import { notError } from '../elements/notifyToasty';
import routes from '../helpers/Routes';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CreateAdminInicial = ({ children }) => {
    const [estadoAdmin, setEstadoAdmin] = useState({message: false})
    const thereAdmin = async () => {
        const res = await axios.get('/api/usuarios/adminCreate');
        setEstadoAdmin(res.data)
    }
    useEffect(() => {
        thereAdmin();
    },[])

    if (estadoAdmin.message) {
        notError({textoNot: 'Acceso denegado, ya existe un Administrador'})
        return <Navigate to={routes.home} />;
    } else {
        return children;
    }
}
export default CreateAdminInicial;