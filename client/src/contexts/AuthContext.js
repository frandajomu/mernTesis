import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../server/src/app';
import { notError, notExito } from '../elements/notifyToasty';

//Creamos el contexto, para trabajar globalmente.
const AuthContext = React.createContext();

//Creamos un hook propio para evitar cargar el useContext y el AuthContext en cada ruta web
const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [usuario, cambiarUsuario] = useState(null);

    const navigate = useNavigate();

    const login = async (userCredentials) => {
        console.log(userCredentials)
        try {
            const res = await axios.post(`${routes.url}/login`, userCredentials);
            if (res.data.isAuthenticated) {
                notExito({ textoNot: 'Ingreso exitoso' })
                cambiarUsuario(res.data.user)
                return null;
            } else {
                notError({ textoNot: 'El email o contraseña es incorrecto'});
                return null;
            }
        } catch (e) {
            notError({ textoNot: e});
        }

    }
    const logout = async () => {
        const res = await axios.get(`${routes.url}/login`);
        cambiarUsuario(null);
        navigate('/')
        if (res.data.message) {
            notExito({ textoNot: res.data.message });
        }
    }
    //Función para saber si alguien esta logged
    const islogged = () => !!usuario;
    //Actualizando Datos de usuario
    const updateUser = (data) => {
        cambiarUsuario({
            ...usuario,
            ...data
        })
    }

    const contextValue = {
        usuario,
        islogged,
        login,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, useAuth };