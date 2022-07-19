import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { BotonMoradoModal } from '../elements/Botones';
import roles from './Roles';

const BotonesModalMostrarUsuarios = ({ estado, editar, agendarCita, cargarResult, editarPrueba, verResult }) => {
    const { usuario } = useAuth();

    switch (estado) {
        case 'Ordenado':
            return (
                <>
                    {usuario.role === roles.admin &&
                        <BotonMoradoModal type="submit" className="btn" onClick={editar}>Editar Datos</BotonMoradoModal>
                    }
                    {usuario.role === roles.laboratorio &&
                        <BotonMoradoModal type="submit" className="btn" onClick={agendarCita}>Agendar Exámen</BotonMoradoModal>
                    }
                </>
            );
        case 'Agendado':
            return (
                <>
                    {usuario.role === roles.admin &&
                        <BotonMoradoModal type="submit" className="btn" onClick={editar}>Editar Datos</BotonMoradoModal>
                    }
                </>
            );
        case 'Realizado':
            return (
                <>
                    {usuario.role === roles.admin &&
                        <BotonMoradoModal type="submit" className="btn" onClick={editar}>Editar Datos</BotonMoradoModal>
                    }
                    {usuario.role === roles.laboratorio &&
                        <BotonMoradoModal type="submit" className="btn" onClick={cargarResult}>Cargar Resultado</BotonMoradoModal>
                    }
                </>
            );
        case 'Resultado':
            return (
                <>
                    {usuario.role === roles.admin &&
                        <BotonMoradoModal type="submit" className="btn" onClick={editar}>Editar Datos</BotonMoradoModal>
                    }
                    {usuario.role === roles.medico &&
                        <BotonMoradoModal type="submit" className="btn" onClick={verResult}>Ver Resultado</BotonMoradoModal>
                    }
                    {usuario.role === roles.laboratorio &&
                        <>
                            <BotonMoradoModal type="submit" className="btn" onClick={editarPrueba}>Editar Resultado</BotonMoradoModal>
                            <BotonMoradoModal type="submit" className="btn" onClick={verResult}>Ver Resultado</BotonMoradoModal>
                        </>
                    }
                </>
            );
        case 'Cancelado':
            return (
                <>
                    {usuario.role === roles.admin &&
                        <BotonMoradoModal type="submit" className="btn" onClick={editar}>Editar Datos</BotonMoradoModal>
                    }
                </>
            );
        case 'Nulo':
            return (
                <>
                    {usuario.role === roles.admin &&
                        <BotonMoradoModal type="submit" className="btn" onClick={editar}>Editar Datos</BotonMoradoModal>
                    }
                </>
            );
        case undefined:
            return null;
        default:
            break;
    }
}

export default BotonesModalMostrarUsuarios;