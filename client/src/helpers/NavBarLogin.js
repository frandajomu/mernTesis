import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BotonBlanco } from '../elements/Botones';
import routes from './Routes';
import { useNavigate } from 'react-router-dom';


const BotonBarra = () => {
    const { islogged } = useAuth();
    if (!islogged()) {
        return <BotonBlanco to={routes.login} className="d-flex me-3 d-none d-md-block" >Ingresar</BotonBlanco>
    } else {
        return null;
    }
}

const BotonMenu = () => {
    const { islogged, logout } = useAuth();
    const navigate = useNavigate();
    const handleRedirect = () => navigate(routes.login);
    if (islogged()) {
        return (
            <>
                <li>
                    <button type="button" className="btn btn-light download" onClick={logout}>Cerrar Sesión</button>
                </li>
            </>
        );
    } else {
        return (
            <>
                <li>
                    <button type="button" className="btn btn-light download d-block d-md-none" onClick={handleRedirect}>Iniciar Sesión</button>
                </li>
            </>
        );
    }
}



export { BotonBarra, BotonMenu };