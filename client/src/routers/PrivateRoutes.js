import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import roles from '../helpers/Roles';
import routes from '../helpers/Routes';

const PrivateRoute = ({ role, children }) => {
    const { usuario } = useAuth();
    const location = useLocation();
    
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
        return <Navigate to={routes.login} state={{from:location}} />;
    }
}
export default PrivateRoute;