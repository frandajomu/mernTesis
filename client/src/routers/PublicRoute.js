import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import routes from '../helpers/Routes';

const PublicRoute = ({children}) => {
    const { usuario } = useAuth();
    
    return !usuario ? children: <Navigate to={routes.home} />;
}
export default PublicRoute;