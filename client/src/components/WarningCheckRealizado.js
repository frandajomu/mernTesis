import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BotonMoradoModal } from '../elements/Botones';
import { notError, notExito } from '../elements/notifyToasty';
import routes from '../helpers/Routes';
import useChangeState from '../hooks/citas/useChangeState';
import theme from '../theme';
import { ReactComponent as AlertaLogo } from './../images/AlertaLogo.svg';

const WarningCheckRealizado = ({idUser, idCita}) => {

    const [EditEstadoPaciente, EditEstadoCita] = useChangeState();
    const navigate = useNavigate();
    //Petición a la base de datos para eliminar la cuenta.
    const dataEstado = { 'estado': 'Realizado' }
    const dataID = { 'id': idCita, 'estado': 'Realizado' }
    const handleAcept = async () => {
        const res2 = await EditEstadoCita(dataID)
        if (res2.message) {
            const res = await EditEstadoPaciente(dataEstado, { id: idUser })
            if(res.message){
                notExito({ textoNot: res.message })
                navigate(routes.pruebasRealizadas)
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
            <div className="modal fade" id="warningCheck" tabIndex="-1" aria-labelledby="warningCheckLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header" style={{ "backgroundColor": theme.moradoOscuro }}>
                            <div className="col d-flex justify-content-center">
                                <h3 className="modal-title text-light" id="warningCheckLabel"><b>ADVERTENCÍA</b></h3>
                            </div>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center" style={{ "color": theme.moradoOscuro }}>
                            <div className="col-sm-4 d-none d-sm-block my-auto text-center">
                                <AlertaLogo width="120" />
                            </div>
                            <div className="col-sm-8 col-12">
                                <p>¡Estas a punto de cambiar el estado de una prueba! </p>
                                <p>La paciente pasara a proceso de espera de carga de sus resultados en la pestaña de Pruebas Realizadas.</p>
                                <p>¿Deseas continuar?</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Cancelar</button>
                            <BotonMoradoModal type="button" className="btn" data-bs-dismiss="modal" onClick={handleAcept}>Aceptar</BotonMoradoModal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WarningCheckRealizado;