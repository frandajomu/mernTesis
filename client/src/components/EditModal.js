import React, { useEffect } from 'react';
import { BotonMoradoModal } from '../elements/Botones';
import theme from '../theme';
import { useForm } from 'react-hook-form';
import EditAccountResolver from '../validations/EditAccountResolver';
import { useAuth } from '../contexts/AuthContext';
import roles from '../helpers/Roles';

const EditModal = ({ isOpen, cerrado }) => {

    const { usuario, updateUser } = useAuth();
    const { register, handleSubmit, formState, reset } = useForm({ resolver: EditAccountResolver });
    const { errors } = formState;


    const onSubmit = (formData) => {
        //formData funcionara para enviar los datos al Backend
        window.location.reload(false);
        updateUser(formData);
        cerrado();
    }

    useEffect(() => {
        if (usuario) {
            reset(
                {
                    name: usuario.name,
                    lastname: usuario.lastname,
                    personalID: usuario.personalID,
                    email: usuario.email,
                    role: usuario.role
                }
            )     
        }
    }, [reset,usuario]);

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset])

    return (
        <div>
            {/* Modal Cambiar Contraseña */}
            <div className="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header" style={{ "backgroundColor": theme.moradoOscuro }}>
                            <div className="col d-flex justify-content-center">
                                <h4 className="modal-title text-light" id="editModalLabel"><b>EDITAR CUENTA</b></h4>
                            </div>
                            <button type="button" onClick={cerrado} className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
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
                            <button type="button" onClick={cerrado} className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <BotonMoradoModal type="submit" className="btn" onClick={handleSubmit(onSubmit)}>Aceptar</BotonMoradoModal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;