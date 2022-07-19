import React from 'react';
import { BotonNaranjaModal } from '../elements/Botones';
import theme from '../theme';
import { ReactComponent as AlertaLogo } from './../images/AlertaLogo.svg';
import { notError, notExito } from '../elements/notifyToasty';
import useDeleteUsuario from '../hooks/useDeleteUsuario';
import useDeleteCita from '../hooks/citas/useDeleteCita';
import useGetUsuario from '../hooks/useGetUsuario';

const DeleteUsuario = ({ idUser, idCita, estado, dataUsers }) => {
    const [DeleteUserData] = useDeleteUsuario({ id: idUser });
    const [DeleteCitaData] = useDeleteCita({ id: idCita });
    const [usuario] = useGetUsuario({ id: idUser })

    //Petición a la base de datos para eliminar la cuenta.
    const handleDelete = async () => {
        if (estado !== 'Nulo') {
            const res = await DeleteCitaData();
            if (res.message) {
                dataUsers()
                notExito({ textoNot: res.message })
            } else {
                notError({ textoNot: res.error })
            }
        } else {
            const res = await DeleteUserData();
            if (res.message) {
                notExito({ textoNot: res.message })
                dataUsers()
            } else {
                notError({ textoNot: res.error })
            }
        }

    }

    return (
        <div>
            {/* Modal */}
            <div className="modal fade" id="deleteUsuario" tabIndex="-1" aria-labelledby="deleteUsuarioLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header" style={{ "backgroundColor": theme.naranjaOscuro }}>
                            <div className="col d-flex justify-content-center">
                                <h3 className="modal-title text-light" id="deleteUsuarioLabel"><b>ADVERTENCÍA</b></h3>
                            </div>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center" style={{ "color": theme.naranjaOscuro }}>
                            <div className="col-sm-4 d-none d-sm-block my-auto text-center">
                                <AlertaLogo width="120" />
                            </div>
                            {estado !== 'Nulo' ?
                                estado === 'Resultado' ?
                                    <>
                                        <div className="col-sm-8 col-12">
                                            <p>¡Estas a punto de eliminar los registros de la cuenta de un usuario! </p>
                                            <p>Se eliminará el registro de la cita y los resultados de la prueba.</p>
                                            <p>No se perderá la cuenta de la paciente.</p>
                                            <p>¿Deseas continuar?</p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="col-sm-8 col-12">
                                            <p>¡Estas a punto de eliminar los registros de la cuenta de un usuario! </p>
                                            <p>Se eliminará el dato de la cita. No se perderá la cuenta de la paciente.</p>
                                            <p>¿Deseas continuar?</p>
                                        </div>
                                    </>
                                :
                                usuario?.role === 'Paciente' ?
                                    <>
                                        <div className="col-sm-8 col-12">
                                            <p>¡Estas a punto de eliminar la cuenta de una paciente! </p>
                                            <p>Se eliminarán todos los registros como citas y resultados relacionados con la cuenta.</p>
                                            <p>Perderá el acceso de manera definitiva.</p>
                                            <p>¿Deseas continuar?</p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="col-sm-8 col-12">
                                            <p>¡Estas a punto de eliminar la cuenta de un usuario! </p>
                                            <p>Perderá el acceso de manera definitiva. Todos los datos creados con esta cuenta no se perderan.</p>
                                            <p>¿Deseas continuar?</p>
                                        </div>
                                    </>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <BotonNaranjaModal type="button" className="btn" data-bs-dismiss="modal" onClick={handleDelete}>Eliminar</BotonNaranjaModal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteUsuario;