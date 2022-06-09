import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Fondo from '../elements/Fondo';
import { ContenedorMayor, InputCont, MostrarText, SelectorA } from '../elements/Formularios';
import { BotonEditar } from '../elements/Botones';
import { useNavigate, useParams } from 'react-router-dom';
import useGetUsuario from '../hooks/useGetUsuario';
import { useForm } from 'react-hook-form';
import CargarResultadoResolver from '../validations/CargarResultadoResolver';
import routes from '../helpers/Routes';
import { notError, notExito } from '../elements/notifyToasty';
import useUploadResultados from '../hooks/resultados/useUploadResultados';

const CargarResultado = () => {
    const { id } = useParams();
    const [usuario] = useGetUsuario({ id });
    const [UploadResultados, EditPacienteData] = useUploadResultados();

    //Uso del hook useForm para adquirir los datos del Formulario
    const { register, handleSubmit, formState, reset } = useForm({ resolver: CargarResultadoResolver });
    const { errors } = formState;
    //Estados selectores
    const [selected, setSelected] = useState(0);
    const [selectedB, setSelectedB] = useState(0);
    const [selectedC, setSelectedC] = useState(0);

    //Envio de datos al backend
    const navigate = useNavigate();
    const onSubmit = async (formData) => {
        const res = await UploadResultados(formData)
        const formData2 = { estado: 'Realizado' }
        const res2 = await EditPacienteData(formData2, { id })
        if (res.message) {
            if(res2.message){
                notExito({ textoNot: res.message })
                navigate(routes.resultado)
                reset()
            }else{
                notError({ textoNot: 'No se ha podido actualizar el estado del paciente' })
            }
        } else{
            notError({ textoNot: res.error })
        }
    }

    //Guardamos el id del usuario conjunto con los resultados Cargados
    useEffect(() => {
        register('idUsuario', { value: id })
    }, [register, id])

    return (
        <>
            <Helmet><title>Cargar Resultados</title></Helmet>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-10 mx-auto my-auto">
                        <h1 className="h2 mb-4 text-center text-primary" style={{ "fontWeight": "700" }}>Cargar Resultados</h1>
                        <div className="col-12 justify-content-between mb-3 d-flex" >
                            <label className="mb-1 my-auto" style={{ "fontWeight": "500" }}>Paciente: {usuario?.name + ' ' + usuario?.lastnameA + ' ' + usuario?.lastnameB} </label>
                            <label className="mb-1 my-auto" style={{ "fontWeight": "500" }}>{usuario?.personalIDtype + ' ' + usuario?.personalID} </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-11 mx-auto my-auto">
                        <ContenedorMayor lista>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="col-12 mb-3 d-flex" >
                                    <label className="mb-1 my-auto me-3" style={{ "fontWeight": "500" }}>Porcentaje de ADN libre fetal:</label>
                                    <InputCont placeholder="0 - 100%" style={{ "fontSize": "0.9rem", "width": "6rem" }} {...register("porcentajeADN")} />
                                </div>
                                {errors?.porcentajeADN && (<div className="mt-2 alert alert-danger" role="alert">{errors.porcentajeADN.message}</div>)}
                                <table className="table text-primary d-none d-lg-table">
                                    <tbody>
                                        <tr>
                                            <th scope="col">Cromosoma</th>
                                            <th scope="col">Resultado</th>
                                            <th scope="col">Probabilidad</th>
                                            <th scope="col">Recomendación</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="input-group mb-2 d-flex text-center">
                                    <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Trisomia 21(T21)</MostrarText>
                                    <MostrarText className="flex-fill">
                                        {selected === 'Menor 1/10,000 (0.01%)'
                                            ? "Riesgo Bajo"
                                            : (selected <= 2 ? "Riesgo Bajo" : "Riesgo Alto")
                                        }
                                    </MostrarText>
                                    <SelectorA
                                        className="flex-fill"
                                        style={{ "fontSize": "0.9rem" }}
                                        {...register("T21", { onChange: (e) => setSelected(e.target.value) })}
                                    >
                                        <option defaultValue>Menor 1/10,000 (0.01%)</option>
                                        <option value="1">Menor a 1/1,000 (0.1%)</option>
                                        <option value="2">Menor a 1/100 (1%)</option>
                                        <option value="3">Menor a 1/10 (10%)</option>
                                        <option value="4">Menor a 50/100 (50%)</option>
                                        <option value="5">Mayor a 90/100 (90%)</option>
                                        <option value="6">Mayor a 99/100 (99%)</option>
                                    </SelectorA>
                                    <InputCont className="flex-fill" placeholder="Recomendación" style={{ "fontSize": "0.9rem" }} {...register("recoT21")} />
                                </div>
                                {errors?.recoT21 && (<div className="mt-2 alert alert-danger" role="alert">{errors.recoT21.message}</div>)}
                                <div className="input-group mb-2 d-flex text-center">
                                    <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Trisomia 18(T18)</MostrarText>
                                    <MostrarText className="flex-fill">
                                        {selectedB === 'Menor 1/10,000 (0.01%)'
                                            ? "Riesgo Bajo"
                                            : (selectedB <= 2 ? "Riesgo Bajo" : "Riesgo Alto")
                                        }
                                    </MostrarText>
                                    <SelectorA
                                        className="flex-fill"
                                        style={{ "fontSize": "0.9rem" }}
                                        {...register("T18", { onChange: (e) => setSelectedB(e.target.value) })}
                                    >
                                        <option defaultValue>Menor 1/10,000 (0.01%)</option>
                                        <option value="1">Menor a 1/1,000 (0.1%)</option>
                                        <option value="2">Menor a 1/100 (1%)</option>
                                        <option value="3">Menor a 1/10 (10%)</option>
                                        <option value="4">Menor a 50/100 (50%)</option>
                                        <option value="5">Mayor a 90/100 (90%)</option>
                                        <option value="6">Mayor a 99/100 (99%)</option>
                                    </SelectorA>
                                    <InputCont className="flex-fill" placeholder="Recomendación" style={{ "fontSize": "0.9rem" }} {...register("recoT18")} />
                                </div>
                                {errors?.recoT18 && (<div className="mt-2 alert alert-danger" role="alert">{errors.recoT18.message}</div>)}
                                <div className="input-group mb-2 d-flex text-center">
                                    <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Trisomia 13(T13)</MostrarText>
                                    <MostrarText className="flex-fill">
                                        {selectedC === 'Menor 1/10,000 (0.01%)'
                                            ? "Riesgo Bajo"
                                            : (selectedC <= 2 ? "Riesgo Bajo" : "Riesgo Alto")
                                        }
                                    </MostrarText>
                                    <SelectorA
                                        className="flex-fill"
                                        style={{ "fontSize": "0.9rem" }}
                                        {...register("T13", { onChange: (e) => setSelectedC(e.target.value) })}
                                    >
                                        <option defaultValue>Menor 1/10,000 (0.01%)</option>
                                        <option value="1">Menor a 1/1,000 (0.1%)</option>
                                        <option value="2">Menor a 1/100 (1%)</option>
                                        <option value="3">Menor a 1/10 (10%)</option>
                                        <option value="4">Menor a 50/100 (50%)</option>
                                        <option value="5">Mayor a 90/100 (90%)</option>
                                        <option value="6">Mayor a 99/100 (99%)</option>
                                    </SelectorA>
                                    <InputCont className="flex-fill" placeholder="Recomendación" style={{ "fontSize": "0.9rem" }} {...register("recoT13")} />
                                </div>
                                {errors?.recoT13 && (<div className="mt-2 alert alert-danger" role="alert">{errors.recoT13.message}</div>)}
                                <div className="input-group mb-2 d-flex text-center">
                                    <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Sexo Fetal</MostrarText>
                                    <SelectorA className="flex-fill" style={{ "fontSize": "0.9rem", "width": "7rem" }} {...register("SexoFetal")}>
                                        <option defaultValue>Femenino</option>
                                        <option value="Masculino">Masculino</option>
                                    </SelectorA>
                                    <SelectorA
                                        className="flex-fill"
                                        style={{ "fontSize": "0.9rem" }}
                                        {...register("valorSexoFetal")}
                                    >
                                        <option defaultValue>Menor 1/10,000 (0.01%)</option>
                                        <option value="1">Menor a 1/1,000 (0.1%)</option>
                                        <option value="2">Menor a 1/100 (1%)</option>
                                        <option value="3">Menor a 1/10 (10%)</option>
                                        <option value="4">Menor a 50/100 (50%)</option>
                                        <option value="5">Mayor a 90/100 (90%)</option>
                                        <option value="6">Mayor a 99/100 (99%)</option>
                                    </SelectorA>
                                    <InputCont className="flex-fill" placeholder="Recomendación" style={{ "fontSize": "0.9rem" }} {...register("recoSexoFetal")} />
                                </div>
                                {errors?.recoSexoFetal && (<div className="mt-2 alert alert-danger" role="alert">{errors.recoSexoFetal.message}</div>)}
                                <div className="input-group mb-4 d-flex text-center">
                                    <MostrarText className="flex-fill" style={{ "width": "8rem" }}>Análisis X,Y</MostrarText>
                                    <InputCont className="flex-fill text-center text-uppercase" placeholder="XX, XY, ..." style={{ "fontSize": "0.9rem", "width": "7rem" }} {...register("Analisis")} />
                                    <SelectorA
                                        className="flex-fill"
                                        style={{ "fontSize": "0.9rem" }}
                                        {...register("valorAnalisis")}
                                    >
                                        <option defaultValue>Menor 1/10,000 (0.01%)</option>
                                        <option value="1">Menor a 1/1,000 (0.1%)</option>
                                        <option value="2">Menor a 1/100 (1%)</option>
                                        <option value="3">Menor a 1/10 (10%)</option>
                                        <option value="4">Menor a 50/100 (50%)</option>
                                        <option value="5">Mayor a 90/100 (90%)</option>
                                        <option value="6">Mayor a 99/100 (99%)</option>
                                    </SelectorA>
                                    <InputCont className="flex-fill" placeholder="Recomendación" style={{ "fontSize": "0.9rem" }} {...register("recoAnalisis")} />
                                </div>
                                {errors?.Analisis && (<div className="mt-2 alert alert-danger" role="alert">{errors.Analisis.message}</div>)}
                                {errors?.recoAnalisis && (<div className="mt-2 alert alert-danger" role="alert">{errors.recoAnalisis.message}</div>)}
                            </form>
                            <div className="mx-auto col-12 text-center">
                                <BotonEditar onClick={handleSubmit(onSubmit)}>Subir Datos</BotonEditar>
                            </div>
                        </ContenedorMayor>
                    </div>
                </div>
            </div>
            <Fondo />
        </>
    );
}

export default CargarResultado;

