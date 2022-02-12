import React from 'react';
import useModal from '../../hooks/useModal';
import Login from '../../pages/Login';
import NavBar from "../NavBar";


const Layout = ({ children }) => {
    const [isOpenLogin, openLogin, closeLogin] = useModal();

    if (isOpenLogin) {
        return (
            <div>
                <Login cerrarLogin={closeLogin}/>
            </div>
        );
    } else {
        return (
            <div>
                <NavBar contenido={children} abrirLogin={openLogin}/>
            </div>
        );
    }
 
}

export default Layout;