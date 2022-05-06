import React, { useEffect, useRef } from 'react';
import { BotonMoradoModal } from '../elements/Botones';
import theme from '../theme';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import routes from '../helpers/Routes';
import useGetUsuario from '../hooks/useGetUsuario';
import formatearFecha from '../helpers/horaFormat';
import useGetOneCita from '../hooks/citas/useGetOneCita';

const MostrarDatosUser = ({ isOpen, cerrado, idUser, role }) => {
    //Obtenemos datos de usuario por ID
    const [UserList] = useGetUsuario({ id: idUser })
    const [cita] = useGetOneCita({ id: idUser });

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
    const editar = () => {
        if (role === 'Paciente') {
            navigate(routes.editarAgenda(idUser))
        } else {
            navigate(routes.editarUsuario(idUser))
        }
        hideModal();
        cerrado();
    }

    const editarCita = () => {
        navigate(routes.editarCita(idUser))
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
                                {role === 'Paciente' &&
                                    <>
                                        <div className="card-header text-center"><b>Datos Importantes</b></div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Fecha de la Cita: {cita?.citadate && formatearFecha(cita?.citadate)}</li>
                                            <li className="list-group-item">Turno: {cita?.turno}</li>
                                            <li className="list-group-item">Semanas de embarazo: {UserList?.embarazo}</li>
                                            <li className="list-group-item">Recomendación: {UserList?.recomendacion}</li>
                                        </ul>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" onClick={hideModal}>Cancelar</button>
                            {role === 'Paciente' &&
                                <BotonMoradoModal type="submit" className="btn" onClick={editarCita}>Editar Cita</BotonMoradoModal>}
                            <BotonMoradoModal type="submit" className="btn" onClick={editar}>Editar Datos</BotonMoradoModal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MostrarDatosUser;