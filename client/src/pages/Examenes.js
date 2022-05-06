import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Fondo from '../elements/Fondo';
import { ContenedorMayor, LineaBotones, SelectorA } from '../elements/Formularios';
import { ReactComponent as IconoEditar } from './../images/editar.svg';
import { ReactComponent as IconoBorrar } from './../images/borrar.svg';
import { ReactComponent as IconoCargar } from './../images/cargar.svg';
import { ReactComponent as IconoVerMas } from './../images/mas.svg';
import { Link } from 'react-router-dom';
import { BotonEditar, BotonFormulario, BotonIconoListaUsers } from '../elements/Botones';
import DeleteUsuario from '../components/DeleteUsuario';
import roles from '../helpers/Roles';
import theme from '../theme';
import routes from '../helpers/Routes';
import SearchBar from './../components/SearchBar'
import useGetPacientes from '../hooks/useGetPaciente';
import { useAuth } from '../contexts/AuthContext';
import MostrarDatosUser from '../components/MostrarDatosUser';
import useModal from '../hooks/useModal';

const Examenes = () => {
    //Miramos usuario logeado
    const { usuario } = useAuth();

    //Obtenemos Lista de Usuarios de la DB
    const dataEstado = { 'estado': 'Agendado' }
    const dataEstado2 = { 'estado': 'Realizado' }
    const [listaAgendado, dataUsers] = useGetPacientes(dataEstado);
    const [listaRealizado] = useGetPacientes(dataEstado2);

    //ID al dar click en eliminar un usuario para DeleteUsuario y EditModal
    const [idUser, setIDUser] = useState();

    //Logica Renderización de Formulario
    const [option, setOption] = useState("Más recientes");

    //Logica Renderización de Formulario
    const [Next, setSiguiente] = useState(0);

    //Usamos hook modal para mostrar datos del usuario
    const [isDatosEdit, datosEditAbierto, datosEditCerrado] = useModal();
    const handleClick = (id) => {
        setIDUser(id);
        datosEditAbierto();
    }

    return (
        <>
            <Helmet><title>Exámenes</title></Helmet>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-10 mx-auto my-auto">
                        <h1 className="h2 mb-4 text-center text-primary" style={{ "fontWeight": "700" }}>Exámenes</h1>
                        <div className="col-12 justify-content-between mb-3 d-flex" >
                            <div className="d-none d-lg-flex">
                                <LineaBotones exam></LineaBotones>
                                {Next === 0 ?
                                    <BotonFormulario className="me-4" active>Agendados</BotonFormulario> :
                                    <BotonFormulario className="me-4" onClick={() => setSiguiente(0)}>Agendados</BotonFormulario>}
                                {Next === 1 ?
                                    <BotonFormulario active>Realizados</BotonFormulario> :
                                    <BotonFormulario onClick={() => setSiguiente(1)}>Realizados</BotonFormulario>}
                            </div>
                            <div className="d-flex d-lg-none">
                                {Next === 0 ?
                                    <BotonFormulario className="me-4" active>1</BotonFormulario> :
                                    <BotonFormulario className="me-4" onClick={() => setSiguiente(0)}>1</BotonFormulario>}
                                {Next === 1 ?
                                    <BotonFormulario active>2</BotonFormulario> :
                                    <BotonFormulario onClick={() => setSiguiente(1)}>2</BotonFormulario>}
                            </div>

                            <SearchBar />

                            <div className="d-none d-xl-flex">
                                <label className="mb-1 my-auto" style={{ "fontWeight": "500" }}>Ordenar: </label>
                                <SelectorA exam className="ms-3 mt-2 mt-md-0" onChange={(e) => {
                                    const selectorOption = e.target.value;
                                    setOption(selectorOption);
                                }}>
                                    <option defaultValue>Más recientes</option>
                                    <option value={roles.admin}>Más antiguos</option>
                                </SelectorA>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-8 mx-auto my-auto">
                        <ContenedorMayor lista>
                            <table className="table text-primary">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Gestación</th>
                                        <th scope="col" className="d-none d-lg-block">Identificación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Next === 0 ?
                                        listaAgendado.map((lista) => {
                                            return (
                                                <tr key={lista._id} >
                                                    <td>{lista.name + ' ' + lista.lastnameA + ' ' + lista.lastnameB}</td>
                                                    <td>{lista.embarazo}</td>
                                                    <td className="d-none d-lg-block">{lista.personalID}</td>
                                                    {usuario.role === roles.medico &&
                                                        <>
                                                            <td className="px-0 mx-0"><BotonIconoListaUsers onClick={()=>handleClick(lista._id)}><IconoEditar /></BotonIconoListaUsers></td>
                                                            <td className="px-1 mx-0">
                                                                <BotonIconoListaUsers data-bs-toggle="modal" data-bs-target="#deleteUsuario" onClick={() => setIDUser(lista._id)}>
                                                                    <IconoBorrar />
                                                                </BotonIconoListaUsers>
                                                            </td>
                                                        </>
                                                    }
                                                    {usuario.role === roles.laboratorio &&
                                                        <td className="px-0 mx-0"><BotonIconoListaUsers as={Link} to={routes.cargarResultado(lista._id)}><IconoCargar /></BotonIconoListaUsers></td>
                                                    }
                                                    {usuario.role === roles.admin &&
                                                        <>
                                                            <td className="px-0 mx-0"><BotonIconoListaUsers onClick={()=>handleClick(lista._id)}><IconoEditar /></BotonIconoListaUsers></td>
                                                            <td className="px-1 mx-0"><BotonIconoListaUsers as={Link} to={routes.cargarResultado(lista._id)}><IconoCargar /></BotonIconoListaUsers></td>
                                                            <td className="px-1 mx-0">
                                                                <BotonIconoListaUsers data-bs-toggle="modal" data-bs-target="#deleteUsuario" onClick={() => setIDUser(lista._id)}>
                                                                    <IconoBorrar />
                                                                </BotonIconoListaUsers>
                                                            </td>
                                                        </>
                                                    }
                                                </tr>
                                            );
                                        })
                                        :
                                        listaRealizado.map((lista) => {
                                            return (
                                                <tr key={lista._id} >
                                                    <td>{lista.name + ' ' + lista.lastnameA + ' ' + lista.lastnameB}</td>
                                                    <td>{lista.embarazo}</td>
                                                    <td className="d-none d-lg-block">{lista.personalID}</td>
                                                    {usuario.role === roles.medico &&
                                                        <>
                                                            <td className="px-0 mx-0"><BotonIconoListaUsers onClick={()=>handleClick(lista._id)}><IconoEditar /></BotonIconoListaUsers></td>
                                                            <td className="px-1 mx-0">
                                                                <BotonIconoListaUsers data-bs-toggle="modal" data-bs-target="#deleteUsuario" onClick={() => setIDUser(lista._id)}>
                                                                    <IconoBorrar />
                                                                </BotonIconoListaUsers>
                                                            </td>
                                                        </>
                                                    }
                                                    {usuario.role === roles.laboratorio &&
                                                        <td className="px-0 mx-0"><BotonIconoListaUsers as={Link} to={routes.cargarResultado(lista._id)}><IconoCargar /></BotonIconoListaUsers></td>
                                                    }
                                                    {usuario.role === roles.admin &&
                                                        <>
                                                            <td className="px-0 mx-0"><BotonIconoListaUsers><IconoEditar /></BotonIconoListaUsers></td>
                                                            <td className="px-1 mx-0"><BotonIconoListaUsers as={Link} to={routes.cargarResultado(lista._id)}><IconoCargar /></BotonIconoListaUsers></td>
                                                            <td className="px-1 mx-0">
                                                                <BotonIconoListaUsers data-bs-toggle="modal" data-bs-target="#deleteUsuario" onClick={() => setIDUser(lista._id)}>
                                                                    <IconoBorrar />
                                                                </BotonIconoListaUsers>
                                                            </td>
                                                        </>
                                                    }
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                            {/*
                            <div className="mx-auto col-12 text-center">
                                <BotonEditar>Cargar Más</BotonEditar>
                            </div>
                            */}

                            {Next === 0 ?
                                listaAgendado.length === 0 &&
                                <div className="mx-auto col-md-8 text-center" style={{ "color": theme.grisClaro2 }}>
                                    <h3>No hay usuarios agregados</h3>
                                    <BotonEditar as={Link} to={routes.agregarUsuarios}>Agendar Prueba</BotonEditar>
                                </div>
                                :
                                listaRealizado.length === 0 &&
                                <div className="mx-auto col-md-8 text-center" style={{ "color": theme.grisClaro2 }}>
                                    <h3>No hay pruebas realizadas</h3>
                                </div>
                            }
                        </ContenedorMayor>
                    </div>
                </div>
            </div>
            <DeleteUsuario
                idUser={idUser}
                role={'Paciente'}
                dataUsers={dataUsers} />
            <MostrarDatosUser
                idUser={idUser}
                isOpen={isDatosEdit}
                cerrado={datosEditCerrado}
                role={'Paciente'} />
            <Fondo />
        </>
    );
}

export default Examenes;

