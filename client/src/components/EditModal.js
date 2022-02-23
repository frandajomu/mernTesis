import React, { useEffect, useRef } from 'react';
import { BotonMoradoModal } from '../elements/Botones';
import theme from '../theme';
import { useForm } from 'react-hook-form';
import EditAccountResolver from '../validations/EditAccountResolver';
import { useAuth } from '../contexts/AuthContext';
import roles from '../helpers/Roles';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';

const EditModal = ({ isOpen, cerrado }) => {

    const { usuario, updateUser } = useAuth();
    const { register, handleSubmit, formState, reset } = useForm({ resolver: EditAccountResolver });
    const { errors } = formState;

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
        reset();
        cerrado();
    }

    //Envio de datos del formulario (Backend)
    const onSubmit = (formData) => {
        //formData funcionara para enviar los datos al Backend
        updateUser(formData);
        hideModal();
        cerrado();
    }

    //Cargue inicial de datos de Usuario para edición
    useEffect(() => {
        if (usuario) {
            reset(
                {
                    name: usuario.name,
                    lastname: usuario.lastnameA,
                    personalID: usuario.personalID,
                    email: usuario.email,
                    role: usuario.role
                }
            )     
        }
    }, [reset,usuario]);

    return (
        <div>
            {/* Modal Cambiar Contraseña */}
            <div className="modal fade" ref={modalRef} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header" style={{ "backgroundColor": theme.moradoOscuro }}>
                            <div className="col d-flex justify-content-center">
                                <h4 className="modal-title text-light" id="staticBackdropLabel"><b>EDITAR CUENTA</b></h4>
                            </div>
                            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={hideModal}></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center" style={{ "color": theme.moradoOscuro }}>
                            <div className="col-sm-8 col-12">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" {...register("name")} />
                                        {errors?.name && (
                                            <div className="form-text">
                                                <div className="alert alert-danger" role="alert">
                                                    {errors.name.message}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastname" className="form-label">Apellido</label>
                                        <input type="text" className="form-control" {...register("lastname")} />
                                        {errors?.lastname && (
                                            <div className="form-text">
                                                <div className="alert alert-danger" role="alert">
                                                    {errors.lastname.message}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="personalID" className="form-label">Identificación</label>
                                        <input type="personalID" className="form-control" {...register("personalID")} />
                                        {errors?.personalID && (
                                            <div className="form-text">
                                                <div className="alert alert-danger" role="alert">
                                                    {errors.personalID.message}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" {...register("email")} />
                                        {errors?.email && (
                                            <div className="form-text">
                                                <div className="alert alert-danger" role="alert">
                                                    {errors.email.message}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="role" className="form-label">Rol de Usuario</label>
                                        <select className="form-select" {...register("role")}>
                                            {Object.keys(roles).map( role =>(
                                                <option key={role}>{role}</option>
                                            ))}
                                        </select>
                                        {errors?.role && (
                                            <div className="form-text">
                                                <div className="alert alert-danger" role="alert">
                                                    {errors.role.message}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" onClick={hideModal}>Cancelar</button>
                            <BotonMoradoModal type="submit" className="btn" onClick={handleSubmit(onSubmit)}>Aceptar</BotonMoradoModal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;