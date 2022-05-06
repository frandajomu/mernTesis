import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BotonNaranjaModal } from '../elements/Botones';
import { notError, notExito } from '../elements/notifyToasty';
import userDeleteMyPerfil from '../hooks/editPerfil/userDeleteMyPerfil';
import theme from '../theme';
import { ReactComponent as AlertaLogo } from './../images/AlertaLogo.svg';

const DeleteModal = () => {
    
    const {logout} = useAuth();
    const [DeleteMyPerfil] = userDeleteMyPerfil();

    //Petición a la base de datos para eliminar la cuenta.
    const handleDelete = async () => {
        const res = await DeleteMyPerfil();
        if (res.message) {
            notExito({ textoNot: res.message })
            logout();
        } else {
            notError({ textoNot: res.error })
        }
    }

    return (
        <div>
            {/* Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header" style={{ "backgroundColor": theme.naranjaOscuro }}>
                            <div className="col d-flex justify-content-center">
                                <h3 className="modal-title text-light" id="deleteModalLabel"><b>ADVERTENCÍA</b></h3>
                            </div>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center" style={{ "color": theme.naranjaOscuro }}>
                            <div className="col-sm-4 d-none d-sm-block my-auto text-center">
                                <AlertaLogo width="120" />
                            </div>
                            <div className="col-sm-8 col-12">
                                <p>¡Estas a punto de eliminar tu cuenta de usuario! </p>
                                <p>Perderas el acceso de manera definitiva. Todos los datos creados con tu cuenta actual no se perderan.</p>
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

export default DeleteModal;