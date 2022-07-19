import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { BotonMorado } from "../../elements/Botones";
import Fondo from "../../elements/Fondo";
import { ContenedorMayor, InputCont } from "../../elements/Formularios";
import { notError, notExito } from "../../elements/notifyToasty";
import PopoverElement from "../../elements/PopoverElement";
import useConfigCitas from "../../hooks/admin/useConfigCitas";

const ConfigTurnos = () => {

    //Uso del hook useForm para adquirir los datos del Formulario
    const { register, handleSubmit, formState, reset } = useForm({});
    const { errors } = formState;

    const [[params], createGlobalParams, editGlobalParams] = useConfigCitas();

    //Envio de datos al backend
    const onSubmit = async (formData) => {
        if (params) {
            const res = await editGlobalParams(formData)
            if (res.message) {
                notExito({ textoNot: res.message })
            } else {
                notError({ textoNot: res.error })
            }
        } else {
            const res = await createGlobalParams(formData)
            if (res.message) {
                notExito({ textoNot: res.message })
            } else {
                notError({ textoNot: res.error })
            }
        }
    }

    useEffect(() => {
        if (params) {
            reset(
                {
                    maxTurno: params.maxTurno,
                    dateMax: params.dateMax
                }
            )
        } else {
            reset(
                {
                    maxTurno: 10,
                    dateMax: 30
                }
            )
        }
    }, [reset, params]);

    return (
        <>
            <Helmet><title>Configuración de Citas</title></Helmet>
            <div className="container py-4">
                <div className="row">
                    <div className="col-11 col-md-7 mx-auto my-auto">
                        <h1 className="h2 mb-4 text-center text-primary" style={{ "fontWeight": "700" }}>Configuración de Citas</h1>
                        <ContenedorMayor>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label className="form-label mb-1">Turnos máximos por dia  <PopoverElement textos={'Limite de turnos máximos de citas que pueden ser agendados en un dia'} />
                                    </label>
                                    <InputCont type="text" className="col-12" {...register("maxTurno")} />
                                    {errors?.maxTurno && (<div className="mt-2 alert alert-danger" role="alert">{errors.maxTurno.message}</div>)}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label mb-1">Dias máximos habilitados  <PopoverElement textos={'Limita el número de dias en el que se permiten agendar citas en el calendario'} />
                                    </label>
                                    <InputCont type="text" className="col-12" {...register("dateMax")} />
                                    {errors?.dateMax && (<div className="mt-2 alert alert-danger" role="alert">{errors.dateMax.message}</div>)}
                                </div>
                                <div>
                                    <p style={{ "fontSize": "0.8rem", "fontWeight": "300" }}><b>Nota: </b>Como administrador tienes el poder de configurar el numero máximo de turnos que pueden ser agendados en un día que por defecto será de 10 días, así como también, la capacidad de fijar el número de días máximos que se visualizan en el calendario cuando se agenda una cita, este dato permitirá o prohibirá alcanzar un límite máximo que por defecto se fija en 30 días.</p>
                                </div>

                                <div className="d-flex justify-content-center mt-3 pt-2">
                                    <BotonMorado type="button" onClick={handleSubmit(onSubmit)}>{params ? 'Editar' : 'Crear'}</BotonMorado>
                                </div>
                            </form>
                        </ContenedorMayor>
                    </div>
                </div>
            </div>
            <Fondo />
        </>
    );
}

export default ConfigTurnos;