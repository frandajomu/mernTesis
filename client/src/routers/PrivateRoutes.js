import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import roles from '../helpers/Roles';
import routes from '../helpers/Routes';

const PrivateRoute = ({ role, children }) => {
    const { usuario } = useAuth();
    
    if (usuario) {
        if (role && usuario?.role !== role) {
            if (usuario?.role !== roles.admin) {
                return <Navigate to={routes.home} />;
            }else{
                return children
            }
        }else{
            return children;
        }
    } else {
        return <Navigate to={routes.login} />;
    }
}
export default PrivateRoute;