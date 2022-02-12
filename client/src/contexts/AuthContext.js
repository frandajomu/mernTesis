import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import roles from '../helpers/Roles';

//Creamos el contexto, para trabajar globalmente.
const AuthContext = React.createContext();

//Creamos un hook propio para evitar cargar el useContext y el AuthContext en cada ruta web
const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [usuario, cambiarUsuario] = useState(
        null
    );
    
    const navigate = useNavigate();

    const login = (userCredentials, fromLocation) => {
        cambiarUsuario(
            {
                id: 1, 
                name: "Francisco", 
                lastname: "Joven Munar",
                personalID: "1007194112",
                datebirth: "26-08-1998",
                genero: "Masculino",
                blood: "A+",
                EPS: "Sanitas",
                celular: "3152661756",
                direccion: "Carrera 9A # 14-102 Sur",
                ciudad: "Pitalito",
                departamento: "Huila",
                email: "u20162151390@usco.edu.co",
                password: "1ui12122132jabdyabsd",
                role: roles.admin
            }
        );
        if(fromLocation){
            navigate(fromLocation, {replace:true});
        }
    }
    const logout = () => cambiarUsuario(null);
    //Función para saber si alguien esta logged
    const islogged = () => !!usuario;
    //Actualizando Datos de usuario
    const updateUser = (data) => {
        cambiarUsuario({
            ...usuario,
            ...data
        })
    }

    const contextValue ={
        usuario,
        islogged,
        login,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            { children }
        </AuthContext.Provider>
    );
}

export { AuthProvider, useAuth };