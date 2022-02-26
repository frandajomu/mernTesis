import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Fondo from '../elements/Fondo';
import { ContenedorMayor, SelectorA } from '../elements/Formularios';
import useGetUsers from '../hooks/useGetUsers';
import { ReactComponent as IconoEditar } from './../images/editar.svg';
import { ReactComponent as IconoBorrar } from './../images/borrar.svg';
import { Link } from 'react-router-dom';
import { BotonEditar, BotonIconoListaUsers } from '../elements/Botones';
import DeleteUsuario from '../components/DeleteUsuario';
import roles from '../helpers/Roles';
import theme from '../theme';
import routes from '../helpers/Routes';

const ListaDeUsuarios = () => {
    //Obtenemos Lista de Usuarios de la DB
    const [listaUser] = useGetUsers();

    //ID al dar click en eliminar un usuario para DeleteUsuario
    const [idUser, setIDUser] = useState();

    //Logica Renderización de Formulario
    const [option, setOption] = useState("Todos");

    //Comprobando si hay usuarios segun el role
    const [noUser, setnoUser] = useState();
    useEffect(() => {
        const esUsuario = (lista) => {
            return lista.role === option;
        }
        setnoUser(listaUser.find(esUsuario))
    }, [listaUser, option])

    return (
        <>
            <Helmet><title>Lista de Usuarios</title></Helmet>
            <div className="container py-4">
                <div className="row">
                    <div className="col-12 col-md-8 mx-auto my-auto">
                        <h1 className="h2 mb-4 text-center text-primary" style={{ "fontWeight": "700" }}>Lista de Usuarios</h1>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label className="mb-1 my-auto" style={{ "fontWeight": "500" }}>Mostrar: </label>
                                <SelectorA className="ms-3 mt-2 mt-md-0" onChange={(e) => {
                                    const selectorOption = e.target.value;
                                    setOption(selectorOption);
                                }}>
                                    <option defaultValue>Todos</option>
                                    <option value={roles.admin}>{roles.admin}</option>
                                    <option value={roles.medico}>{roles.medico}</option>
                                    <option value={roles.laboratorio}>{roles.laboratorio}</option>
                                    <option value={roles.paciente}>{roles.paciente}</option>
                                </SelectorA>
                            </div>
                        </div>
                        <ContenedorMayor lista>
                            <table className="table text-primary">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Rol</th>
                                        <th scope="col" className="d-none d-lg-block">Identificación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaUser.map((lista) => {
                                        if (lista.role === option) {
                                            return (
                                                <tr key={lista.id} >
                                                    <td>{lista.name + ' ' + lista.lastnameA + ' ' + lista.lastnameB}</td>
                                                    <td>{lista.role}</td>
                                                    <td className="d-none d-lg-block">{lista.personalID}</td>
                                                    <td className="px-0 mx-0"><BotonIconoListaUsers as={Link} to={`/editarUsuario/${lista.id}`}><IconoEditar /></BotonIconoListaUsers></td>
                                                    <td className="px-1 mx-0">
                                                        <BotonIconoListaUsers data-bs-toggle="modal" data-bs-target="#deleteUsuario" onClick={() => setIDUser(lista.id)}>
                                                            <IconoBorrar />
                                                        </BotonIconoListaUsers>
                                                    </td>
                                                </tr>
                                            );
                                        } else if (option === "Todos") {
                                            return (
                                                <tr key={lista.id} >
                                                    <td>{lista.name + ' ' + lista.lastnameA + ' ' + lista.lastnameB}</td>
                                                    <td>{lista.role}</td>
                                                    <td className="d-none d-lg-block">{lista.personalID}</td>
                                                    <td className="px-0 mx-0"><BotonIconoListaUsers as={Link} to={routes.editarUsuario(lista.id)}><IconoEditar /></BotonIconoListaUsers></td>
                                                    <td className="px-1 mx-0">
                                                        <BotonIconoListaUsers data-bs-toggle="modal" data-bs-target="#deleteUsuario" onClick={() => setIDUser(lista.id)}>
                                                            <IconoBorrar />
                                                        </BotonIconoListaUsers>
                                                    </td>
                                                </tr>
                                            );
                                        } else {
                                            return null
                                        }
                                    })}
                                </tbody>
                            </table>
                            {/*
                            <div className="mx-auto col-12 text-center">
                                <BotonEditar>Cargar Más</BotonEditar>
                            </div>
                            */}
                            {listaUser.length !== 0 ?
                                option !== "Todos" &&
                                noUser === undefined &&
                                <div className="mx-auto col-md-8 text-center" style={{ "color": theme.grisClaro2 }}>
                                    <h3>No hay usuarios con este rol</h3>
                                    <BotonEditar as={Link} to={routes.agregarUsuarios}> Agregar Usuario</BotonEditar>
                                </div>
                                :
                                <div className="mx-auto col-md-8 text-center" style={{ "color": theme.grisClaro2 }}>
                                    <h3>No hay usuarios agregados</h3>
                                    <BotonEditar as={Link} to={routes.agregarUsuarios}> Agregar Usuario</BotonEditar>
                                </div>
                            }
                        </ContenedorMayor>
                    </div>
                </div>
            </div>
            <DeleteUsuario idUser={idUser} />
            <Fondo />
        </>
    );
}

export default ListaDeUsuarios;

