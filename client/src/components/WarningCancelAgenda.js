import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BotonNaranjaModal } from '../elements/Botones';
import { notError, notExito } from '../elements/notifyToasty';
import routes from '../helpers/Routes';
import useChangeState from '../hooks/citas/useChangeState';
import theme from '../theme';
import { ReactComponent as AlertaLogo } from './../images/AlertaLogo.svg';

const WarningCancelAgenda = ({idUser, idCita}) => {

    const [EditEstadoPaciente, EditEstadoCita] = useChangeState();
    const navigate = useNavigate();
    //Petición a la base de datos para eliminar la cuenta.
    const dataEstado = { 'estado': 'Cancelado' }
    const dataID = { 'id': idCita, 'estado': 'Cancelado' }
    const handleAcept = async () => {
        const res2 = await EditEstadoCita(dataID)
        if (res2.message) {
            const res = await EditEstadoPaciente(dataEstado, { id: idUser })
            if(res.message){
                notExito({ textoNot: res.message })
                navigate(routes.pruebasCanceladas)
            }else{
                notError({ textoNot: res.error })
            }
        } else {
            notError({ textoNot: res2.error })
        }
    }

    return (
        <div>
            {/* Modal */}
            <div className="modal fade" id="warningCancel" tabIndex="-1" aria-labelledby="warningCancelLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header" style={{ "backgroundColor": theme.naranjaOscuro }}>
                            <div className="col d-flex justify-content-center">
                                <h3 className="modal-title text-light" id="warningCancelLabel"><b>ADVERTENCÍA</b></h3>
                            </div>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center" style={{ "color": theme.naranjaOscuro }}>
                            <div className="col-sm-4 d-none d-sm-block my-auto text-center">
                                <AlertaLogo width="120" />
                            </div>
                            <div className="col-sm-8 col-12">
                                <p>¡Vas a cancelar una prueba ya agendada! </p>
                                <p>La prueba pasara a la pestaña de Pruebas Canceladas, y no se podra retirar de cancelados.</p>
                                <p>¿Deseas continuar?</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <BotonNaranjaModal type="button" className="btn" data-bs-dismiss="modal" onClick={handleAcept}>Aceptar</BotonNaranjaModal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WarningCancelAgenda;