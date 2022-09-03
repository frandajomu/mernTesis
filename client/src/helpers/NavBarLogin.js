import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BotonBlanco } from '../elements/Botones';
import routes from './Routes';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Bars } from './../images/bars.svg';


const BotonBarra = ({siderbarClick}) => {
    const { islogged } = useAuth();
    if (!islogged()) {
        return <BotonBlanco to={routes.login} className="d-flex me-3 d-none d-md-block" >Ingresar</BotonBlanco>
    } else {
        return <Bars type="button" id="sidebarCollapse" alt="" width="25" onClick={siderbarClick} />;
    }
}

const BotonMenu = ({siderbarClick}) => {
    const { islogged, logout } = useAuth();
    const navigate = useNavigate();
    const handleRedirect = () => navigate(routes.login);
    const handleClick = () => { logout(); siderbarClick()};
    if (islogged()) {
        return (
            <>
                <li>
                    <button type="button" className="btn btn-light download" onClick={handleClick}>Cerrar Sesión</button>
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