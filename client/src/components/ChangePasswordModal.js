import React, { useEffect } from 'react';
import { BotonMoradoModal } from '../elements/Botones';
import theme from '../theme';
import { useForm } from 'react-hook-form';
import ChangePasswordResolver from '../validations/ChangePasswordResolver';

const ChangePasswordModal = ({ isOpen, cerrado }) => {

    const { register, handleSubmit, formState, reset } = useForm({ resolver: ChangePasswordResolver });
    const { errors } = formState;
    
    /*
    const myContainer = useRef(null);
    const myContainerNode = myContainer.current
    
    const buttonRef = useRef(null);
    const buttonRefNode = buttonRef.current
    console.log(buttonRefNode);

    function handleCloseModal(){            
        myContainerNode.classList.remove("show");
        myContainerNode.removeAttribute("style", "role");
        document.querySelectorAll(".modal-backdrop")
                .forEach(el => el.classList.remove("modal-backdrop"));
    }

    function handleCloseButtonModal(){            
        buttonRefNode.setAttribute('data-bs-dismiss', "modal");
    }*/

    const onSubmit = (formData) => {
        window.location.reload(false);
        //formData funcionara para enviar los datos al Backend
        cerrado();
    }

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    return (
        <>
            {/* Modal Cambiar Contraseña */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header" style={{ "backgroundColor": theme.moradoOscuro }}>
                            <div className="col d-flex justify-content-center">
                                <h4 className="modal-title text-light" id="staticBackdropLabel"><b>NUEVA CONTRASEÑA</b></h4>
                            </div>
                            <button type="button" onClick={cerrado} className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center" style={{ "color": theme.moradoOscuro }}>
                            <div className="col-sm-8 col-12">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="inpPassword1" className="form-label">Nueva Contraseña</label>
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
                                        <label htmlFor="inpPassword2" className="form-label">Confirmar Contraseña</label>
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
                            <button type="button" onClick={cerrado} className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <BotonMoradoModal type="submit" className="btn" onClick={handleSubmit(onSubmit)}>Aceptar</BotonMoradoModal>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangePasswordModal;