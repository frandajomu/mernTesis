import React from 'react';
import ChangePasswordModal from '../components/ChangePasswordModal';
import DeleteModal from '../components/DeleteModal';
import EditModal from '../components/EditModal';
import { useAuth } from '../contexts/AuthContext';
import { BotonEditar, BotonEliminar } from '../elements/Botones';
import Fondo from '../elements/Fondo';
import useModal from '../hooks/useModal';
import theme from '../theme';
import { ReactComponent as Profile } from './../images/Profile.svg';

const MiPerfil = () => {
    const { usuario } = useAuth();

    const [cambiarContraseña, abiertoContraseña, cerradoContraseña] = useModal();
    const [cambiarDatos, abiertoDatos, cerradoDatos] = useModal();

    return (
        <>
            <div className='container-flex' style={{ "color": theme.moradoOscuro }}>
                <div className='row mt-5'>
                    <div className='col d-flex justify-content-center mb-5'>
                        <div className="card col-12 col-sm-8 col-lg-6" style={{ "borderColor": theme.moradoOscuro, "backgroundColor": "#ffff" }} >
                            <div className="card-header text-center" style={{ "backgroundColor": theme.moradoOscuro }}>
                                <h4 className=" text-white font-weight-bold my-2">Cuenta Personal</h4>
                            </div>
                            <Profile className="card-img-top img-fluid mx-auto mt-4" style={{ "width": "200" }} />
                            <div className="card-body">
                                <h5 className="card-title text-center">{usuario?.name + ' ' + usuario?.lastnameA + ' ' + usuario?.lastnameB} </h5>
                                <p className="card-text text-center">{usuario?.role}</p>
                                <div className="card-header text-center"><b>Datos Personales</b></div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Identificación: {usuario?.personalID}</li>
                                    <li className="list-group-item">Correo: {usuario?.email}</li>
                                    <li className="list-group-item">Fecha de nacimiento: {usuario?.datebirth}</li>
                                    <li className="list-group-item">Genero: {usuario?.genero}</li>
                                    <li className="list-group-item">Grupo Sanguineo: {usuario?.bloodType + ' ' + usuario?.blood}</li>
                                    <li className="list-group-item">EPS: {usuario?.EPS}</li>
                                </ul>
                                <div className="card-header text-center"><b>Datos de Contacto</b></div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Celular: {usuario?.celular}</li>
                                    <li className="list-group-item">Dirección: {usuario?.direccion}</li>
                                    <li className="list-group-item">Ciudad: {usuario?.ciudad}</li>
                                    <li className="list-group-item">Departamento: {usuario?.departamento}</li>
                                </ul>
                                <div className="d-grid gap-2 col-9 mx-auto mt-3">
                                    <BotonEditar type="button" className="btn btn-light" onClick={abiertoDatos}>Editar Cuenta</BotonEditar>
                                    <BotonEditar type="button" className="btn btn-light" onClick={abiertoContraseña}>Cambiar Contraseña</BotonEditar>
                                    <BotonEliminar className="btn mt-4 mb-2" data-bs-toggle="modal" data-bs-target="#deleteModal">Eliminar Cuenta</BotonEliminar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Fondo />
            <DeleteModal />
            <ChangePasswordModal
                isOpen={cambiarContraseña}
                cerrado={cerradoContraseña}
            />
            <EditModal
                isOpen={cambiarDatos}
                cerrado={cerradoDatos}
            />
        </>
    );
}

export default MiPerfil;