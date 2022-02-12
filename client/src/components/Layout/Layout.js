import React from 'react';
import { useLocation } from 'react-router-dom';
import routes from '../../helpers/Routes';
import NavBar from "../NavBar";

const Layout = ({ children }) => {
        const location = useLocation();
        
        if(location.pathname === routes.login){
            return children
        }else{
        return (
            <div>
                <NavBar contenido={children}/>
            </div>
        );}

}

export default Layout;