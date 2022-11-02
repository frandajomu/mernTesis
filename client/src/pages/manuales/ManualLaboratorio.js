import React from 'react';
import Manual from './Manual';
import { useAuth } from '../../contexts/AuthContext';

const ManualLaboratorio = () => {
    const { usuario } = useAuth();
    return (
            <Manual user = {usuario}/>
    );
}
 
export default ManualLaboratorio;