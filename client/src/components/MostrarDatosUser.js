import React, { useEffect, useRef } from 'react';
import theme from '../theme';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../helpers/Routes';
import useGetUsuario from '../hooks/useGetUsuario';
import formatearFecha from '../helpers/horaFormat';
import useGetOneCita from '../hooks/citas/useGetOneCita';
import BotonesModalMostrarUsuarios from '../helpers/BotonesModalMostrarUsuarios';
import whatGestacion from '../helpers/whatGestacion';

const MostrarDatosUser = ({ isOpen, cerrado, idUser, idCita }) => {
    //Obtenemos datos de usuario por ID
    const [UserList] = useGetUsuario({ id: idUser })
    const [cita] = useGetOneCita({ id: idCita });

    //Configuración del modal
    const modalRef = useRef()

    const showModal = () => {
        const modalEle = modalRef.current
        const bsModal = new Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        })
        bsModal.show()
    }
    useEffect(() => { if (isOpen) { showModal() } }, [isOpen])

    const hideModal = () => {
        const modalEle = modalRef.current
        const bsModal = bootstrap.Modal.getInstance(modalEle)
        bsModal.hide()
        cerrado();
    }

    //Redirigimos a pagina de editarUsuario
    const navigate = useNavigate();
    const location = useLocation();
    const editar = () => {
        if (UserList.role === 'Paciente') {
            navigate(routes.editarAgenda(idUser), {state: {from: location}})
        } else {
            navigate(routes.editarUsuario(idUser))
        }
        hideModal();
        cerrado();
    }

    const agendarCita = () => {
        navigate(routes.agendarCita(idUser))
        hideModal();
        cerrado();
    }

    const editarPrueba = () => {
        navigate(routes.editarResultado(idCita))
        hideModal();
        cerrado();
    }

    const verResult = () => {
        navigate(routes.resultado(idCita))
        hideModal();
        cerrado();
    }

    const cargarResult = () => {
        navigate(routes.cargarResultado(idCita))
        hideModal();
        cerrado();
    }

    return (
        <div>
            {/* Modal Cambiar Contraseña */}
            <div className="modal fade" ref={modalRef} tabIndex="-1">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header" style={{ "backgroundColor": theme.moradoOscuro }}>
                            <div className="col d-flex justify-content-center">
                                <h4 className="modal-title text-light" id="staticBackdropLabel"><b>DATOS USUARIO</b></h4>
                            </div>
                            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={hideModal}></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center" style={{ "color": theme.moradoOscuro }}>
                            <div className="col-12">
                                <p className="card-text text-center">{UserList?.role}</p>
                                <div className="card-header text-center"><b>Datos Personales</b></div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Nombre: {UserList?.name}</li>
                                    <li className="list-group-item">Apellidos: {UserList?.lastnameA + ' ' + UserList?.lastnameB}</li>
                                    <li className="list-group-item">Identificación: {UserList?.personalIDtype + ' ' + UserList?.personalID}</li>
                                    <li className="list-group-item">Correo: {UserList?.email}</li>
                                    <li className="list-group-item">Fecha de nacimiento: {UserList?.datebirth && formatearFecha(UserList?.datebirth)}</li>
                                    <li className="list-group-item">Genero: {UserList?.genero}</li>
                                    <li className="list-group-item">Grupo Sanguineo: {UserList?.bloodType + ' ' + UserList?.blood}</li>
                                    <li className="list-group-item">EPS: {UserList?.EPS}</li>
                                </ul>
                                <div className="card-header text-center"><b>Datos de Contacto</b></div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Celular: {UserList?.celular}</li>
                                    <li className="list-group-item">Celular B: {UserList?.celular2}</li>
                                    <li className="list-group-item">Dirección: {UserList?.direccion}</li>
                                    <li className="list-group-item">Ciudad: {UserList?.ciudad}</li>
                                    <li className="list-group-item">Departamento: {UserList?.departamento}</li>
                                </ul>
                                {UserList.role === 'Paciente' &&
                                    <>
                                        <div className="card-header text-center"><b>Datos Importantes</b></div>
                                        <ul className="list-group list-group-flush">
                                            {UserList.estado !== 'Ordenado' &&
                                                <>
                                                    <li className="list-group-item">Fecha de la Cita: {cita?.citadate ? formatearFecha(cita?.citadate) : 'No Fijada'}</li>
                                                    <li className="list-group-item">Turno: {cita?.turno ? cita?.turno : 'No Fijado'}</li>
                                                </>
                                            }
                                            <li className="list-group-item">Tiempo de Gestación: {UserList?.embarazo && whatGestacion(UserList?.embarazo) + ' dias ( ' + (whatGestacion(UserList?.embarazo)/7).toFixed(1) +' semanas )' }</li>
                                            <li className="list-group-item">Recomendación: {UserList?.recomendacion}</li>
                                        </ul>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" onClick={hideModal}>Cancelar</button>
                            <BotonesModalMostrarUsuarios
                                estado={UserList?.estado}
                                editar={editar}
                                agendarCita={agendarCita}
                                cargarResult={cargarResult}
                                editarPrueba={editarPrueba}
                                verResult={verResult}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MostrarDatosUser;