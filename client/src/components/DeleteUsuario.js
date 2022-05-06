import React from 'react';
import { BotonNaranjaModal } from '../elements/Botones';
import theme from '../theme';
import { ReactComponent as AlertaLogo } from './../images/AlertaLogo.svg';
import { notError, notExito } from '../elements/notifyToasty';
import useDeleteUsuario from '../hooks/useDeleteUsuario';
import useDeleteCita from '../hooks/citas/useDeleteCita';

const DeleteUsuario = ({ idUser, dataUsers, role }) => {
    const [DeleteUserData] = useDeleteUsuario({ id: idUser });
    const [DeleteCitaData] = useDeleteCita({ id: idUser });

    //Petición a la base de datos para eliminar la cuenta.
    const handleDelete = async () => {
        const res = await DeleteUserData();
        if (res.message) {
            notExito({ textoNot: res.message })
            dataUsers()
            if (role === 'Paciente') {
                const res2 = await DeleteCitaData();
                if (res2.message) {
                    notExito({ textoNot: res2.message })
                } else {
                    notError({ textoNot: res2.error })
                }
            }
        } else {
            notError({ textoNot: res.error })
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
                            <div className="col-sm-8 col-12">
                                <p>¡Estas a punto de eliminar la cuenta de un usuario! </p>
                                <p>Perdera el acceso de manera definitiva. Todos los datos creados con esta cuenta no se perderan.</p>
                                <p>¿Deseas continuar?</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <BotonNaranjaModal type="button" className="btn" data-bs-dismiss="modal" onClick={handleDelete}>Eliminar Cuenta</BotonNaranjaModal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteUsuario;