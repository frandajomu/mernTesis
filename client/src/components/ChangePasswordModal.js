import React, { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { BotonMoradoModal } from '../elements/Botones';
import theme from '../theme';
import { useForm } from 'react-hook-form';
import ChangePasswordResolver from '../validations/ChangePasswordResolver';
import { notError, notExito } from '../elements/notifyToasty';
import userPutPassword from '../hooks/editPerfil/userPutPassword';
import routes from '../helpers/Routes';
import { useNavigate } from 'react-router-dom';

const ChangePasswordModal = ({ isOpen, cerrado }) => {

    const [PutPassword] = userPutPassword();
    const { register, handleSubmit, formState, reset } = useForm({ resolver: ChangePasswordResolver });
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
    const navigate = useNavigate();
    const onSubmit = async (formData) => {
        const res = await PutPassword(formData);
        if (res.message) {
            notExito({ textoNot: res.message })
            navigate(routes.perfil)
            hideModal();
            cerrado();
            reset();
        } else {
            notError({ textoNot: res.error })
        }
    }

    return (
        <>
            {/* Modal Cambiar Contraseña */}
            <div className="modal fade" ref={modalRef} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header" style={{ "backgroundColor": theme.moradoOscuro }}>
                            <div className="col d-flex justify-content-center">
                                <h4 className="modal-title text-light" id="staticBackdropLabel"><b>NUEVA CONTRASEÑA</b></h4>
                            </div>
                            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={hideModal}></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center" style={{ "color": theme.moradoOscuro }}>
                            <div className="col-sm-8 col-12">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label className="form-label">Contraseña Actual</label>
                                        <input type="password" className="form-control" id="inpPassword0" {...register("oldPassword")} />
                                        {errors?.oldPassword && (
                                            <div className="form-text">
                                                <div className="alert alert-danger" role="alert">
                                                    {errors.oldPassword.message}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nueva Contraseña</label>
                                        <input type="password" className="form-control" id="inpPassword1" {...register("password")} />
                                        {errors?.password && (
                                            <div className="form-text">
                                                <div className="alert alert-danger" role="alert">
                                                    {errors.password.message}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Confirmar Contraseña</label>
                                        <input type="password" className="form-control" id="inpPassword2" {...register("passwordConfirmation")} />
                                        {errors?.passwordConfirmation && (
                                            <div className="form-text">
                                                <div className="alert alert-danger" role="alert">
                                                    {errors.passwordConfirmation.message}
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
        </>
    );
}

export default ChangePasswordModal;