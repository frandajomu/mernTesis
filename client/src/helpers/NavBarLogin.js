import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BotonBlanco } from '../elements/Botones';
import routes from './Routes';
import { Link } from 'react-router-dom';


const BotonBarra = ({ abrirLogin }) => {
    const { islogged } = useAuth();
    if (!islogged()) {
        return <BotonBlanco to={routes.home} className="d-flex me-3 d-none d-md-block" onClick={abrirLogin}>Ingresar</BotonBlanco>
    } else {
        return null;
    }
}

const BotonMenu = ({ abrirLogin }) => {
    const { islogged, logout } = useAuth();
    if (islogged()) {
        return (
            <>
                <li>
                    <button type="button" className="btn btn-light download" onClick={logout}>Cerrar Sesión</button>
                    <Link to={routes.home} />
                </li>
            </>
        );
    } else {
        return (
            <>
                <li>
                    <button type="button" className="btn btn-light download d-block d-md-none" onClick={abrirLogin}>Iniciar Sesión</button>
                </li>
            </>
        );
    }
}



export { BotonBarra, BotonMenu };