import React from 'react'
import { ReactComponent as IconoEditar } from './../images/editar.svg';
import { ReactComponent as IconoBorrar } from './../images/borrar.svg';
import { ReactComponent as IconoCargar } from './../images/cargar.svg';
import { ReactComponent as IconoVerMas } from './../images/mas.svg';
import { ReactComponent as IconoCheck } from './../images/Check.svg';
import { ReactComponent as IconoCalendarCheck } from './../images/CalendarCheck.svg';
import { BotonIconoListaUsers } from '../elements/Botones';
import { useAuth } from '../contexts/AuthContext';
import roles from './Roles';

const BotonesExamenesRender = ({ lista, estado, handleClick, setIDUser, setIDCita }) => {
    const { usuario } = useAuth();

    switch (estado) {
        case 'Ordenado':
            return (
                <>
                    {usuario.role === roles.medico &&
                        <td className="px-0 mx-0"><BotonIconoListaUsers onClick={() => handleClick(lista._id)}><IconoVerMas /></BotonIconoListaUsers></td>
                    }
                    {usuario.role === roles.laboratorio &&
                        <td className="px-0 mx-0"><BotonIconoListaUsers onClick={() => handleClick(lista._id)}><IconoCalendarCheck /></BotonIconoListaUsers></td>
                    }
                    {usuario.role === roles.admin &&
                        <td className="px-0 mx-0"><BotonIconoListaUsers onClick={() => handleClick(lista._id)}><IconoVerMas /></BotonIconoListaUsers></td>
                    }
                </>
            );
        case 'Agendado':
            return (
                <>
                    {usuario.role === roles.laboratorio &&
                        <>
                            <td className="px-0 mx-0"><BotonIconoListaUsers onClick={() => { handleClick(lista.idUser._id); setIDCita(lista._id) }}><IconoVerMas /></BotonIconoListaUsers></td>
                            <td className="px-1 mx-0">
                                <BotonIconoListaUsers data-bs-toggle="modal" data-bs-target="#warningCheck" onClick={() => { setIDUser(lista.idUser._id); setIDCita(lista._id) }}>
                                    <IconoCheck />
                                </BotonIconoListaUsers>
                            </td>
                            <td className="px-0 mx-0">
                                <BotonIconoListaUsers data-bs-toggle="modal" data-bs-target="#warningCancel" onClick={() => { setIDUser(lista.idUser._id); setIDCita(lista._id) }}>
                                    <IconoBorrar />
                                </BotonIconoListaUsers>
                            </td>
                        </>
                    }
                    {usuario.role === roles.admin &&
                        <>
                            <td className="px-0 mx-0"><BotonIconoListaUsers onClick={() => { handleClick(lista.idUser._id); setIDCita(lista._id) }}><IconoVerMas /></BotonIconoListaUsers></td>
                            <td className="ps-1 mx-0">
                                <BotonIconoListaUsers data-bs-toggle="modal" data-bs-target="#deleteUsuario" onClick={() => { setIDUser(lista.idUser._id); setIDCita(lista._id) }}>
                                    <IconoBorrar />
                                </BotonIconoListaUsers>
                            </td>
                        </>
                    }
                </>
            );
        case 'Realizado':
            return (
                <>
                    {usuario.role === roles.laboratorio &&
                        <td className="px-0 mx-0"><BotonIconoListaUsers onClick={() => { handleClick(lista.idUser._id); setIDCita(lista._id) }}><IconoCargar /></BotonIconoListaUsers></td>
                    }
                    {usuario.role === roles.admin &&
                        <>
                            <td className="px-0 mx-0"><BotonIconoListaUsers onClick={() => { handleClick(lista.idUser._id); setIDCita(lista._id) }}><IconoVerMas /></BotonIconoListaUsers></td>
                            <td className="ps-1 mx-0">
                                <BotonIconoListaUsers data-bs-toggle="modal" data-bs-target="#deleteUsuario" onClick={() => { setIDUser(lista.idUser._id); setIDCita(lista._id) }}>
                                    <IconoBorrar />
                                </BotonIconoListaUsers>
                            </td>
                        </>
                    }
                </>
            );
        case 'Resultado':
            return (
                <>
                    {usuario.role === roles.medico &&
                        <td className="px-0 mx-0"><BotonIconoListaUsers onClick={() => { handleClick(lista.idUser._id); setIDCita(lista._id) }}><IconoVerMas /></BotonIconoListaUsers></td>
                    }
                    {usuario.role === roles.laboratorio &&
                        <td className="px-0 mx-0"><BotonIconoListaUsers onClick={() => { handleClick(lista.idUser._id); setIDCita(lista._id) }}><IconoEditar /></BotonIconoListaUsers></td>
                    }
                    {usuario.role === roles.admin &&
                        <>
                            <td className="px-0 mx-0"><BotonIconoListaUsers onClick={() => { handleClick(lista.idUser._id); setIDCita(lista._id) }}><IconoVerMas /></BotonIconoListaUsers></td>
                            <td className="ps-1 mx-0">
                                <BotonIconoListaUsers data-bs-toggle="modal" data-bs-target="#deleteUsuario" onClick={() => { setIDUser(lista.idUser._id); setIDCita(lista._id) }}>
                                    <IconoBorrar />
                                </BotonIconoListaUsers>
                            </td>
                        </>
                    }
                </>
            );
        case 'Cancelado':
            return (
                <>
                    {usuario.role === roles.laboratorio &&
                        <td className="px-0 mx-0"><BotonIconoListaUsers onClick={() => { handleClick(lista.idUser._id); setIDCita(lista._id) }}><IconoVerMas /></BotonIconoListaUsers></td>
                    }
                    {usuario.role === roles.admin &&
                        <>
                            <td className="px-0 mx-0"><BotonIconoListaUsers onClick={() => { handleClick(lista.idUser._id); setIDCita(lista._id) }}><IconoVerMas /></BotonIconoListaUsers></td>
                            <td className="ps-1 mx-0">
                                <BotonIconoListaUsers data-bs-toggle="modal" data-bs-target="#deleteUsuario" onClick={() => { setIDUser(lista.idUser._id); setIDCita(lista._id) }}>
                                    <IconoBorrar />
                                </BotonIconoListaUsers>
                            </td>
                        </>
                    }
                </>
            );
        default:
            break;
    }
}

export default BotonesExamenesRender;