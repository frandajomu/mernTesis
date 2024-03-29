import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ContenedorMayor, InputCont, InputContB, InputText, LineaBotones, SelectorA } from '../elements/Formularios';
import { BotonFormulario, BotonMorado } from '../elements/Botones';
import Fondo from '../elements/Fondo';
import roles from '../helpers/Roles';
import { Helmet } from "react-helmet";
import { addDays, parseISO } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AgregarAgendaResolver from '../validations/AgregarAgendaResolver';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetUsuario from '../hooks/useGetUsuario';
import useEditUsuario from '../hooks/useEditUsuario';
import { notError, notExito } from '../elements/notifyToasty';
import PopoverElement from '../elements/PopoverElement';

const EditarAgenda = () => {

    //Uso del hook useForm para adquirir los datos del Formulario
    const { control, register, handleSubmit, formState, reset } = useForm({ resolver: AgregarAgendaResolver });
    const { errors } = formState;

    //Cargando datos iniciales
    const { id } = useParams();
    const [usuario] = useGetUsuario({ id });
    const [EditUserData] = useEditUsuario();

    useEffect(() => {
        if (usuario) {
            reset(
                {
                    name: usuario?.name,
                    lastnameA: usuario?.lastnameA,
                    lastnameB: usuario?.lastnameB,
                    personalIDtype: usuario?.personalIDtype,
                    personalID: usuario?.personalID,
                    datebirth: parseISO(usuario?.datebirth),
                    genero: usuario?.genero,
                    bloodType: usuario?.bloodType,
                    blood: usuario?.blood,
                    EPS: usuario?.EPS,
                    celular: usuario?.celular,
                    celular2: usuario?.celular2,
                    direccion: usuario?.direccion,
                    ciudad: usuario?.ciudad,
                    departamento: usuario?.departamento,
                    email: usuario?.email,
                    role: usuario?.role,
                    estado: usuario?.estado,
                    embarazo: parseISO(usuario?.embarazo),
                    recomendacion: usuario?.recomendacion
                }
            )
        }
    }, [reset, usuario]);

    //Envio de datos al backend
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";
    const onSubmit = async (formData) => {
        const res = await EditUserData(formData, { id })
        if (res.message) {
            notExito({ textoNot: res.message })
            navigate(from.pathname)
            reset();
        } else {
            notError({ textoNot: res.error })
        }
    }

    //Logica Renderización de Formulario
    const [Next, setSiguiente] = useState(0);
    const siguiente = () => setSiguiente(Next + 1);
    const atras = () => setSiguiente(Next - 1);

    //Cambio a español para el DayPicker
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',];
    const days = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
    const locale = { localize: { day: n => days[n], month: n => months[n] }, formatLong: { date: () => 'mm/dd/yyyy' } }

    //Parametros inmutables de la Paciente
    useEffect(() => {
        register('genero', { value: 'Femenino' })
        register('role', { value: roles.paciente })
    }, [register])

    return (
        <>
            <Helmet><title>Editar Datos del Paciente</title></Helmet>
            <div className="container py-4">
                <div className="row">
                    <div className="col-11 col-md-7 mx-auto my-auto">
                        <h1 className="h2 mb-4 text-center text-primary" style={{ "fontWeight": "700" }}>Editar datos Paciente</h1>
                        <div className="row">
                            <div className="col-12 justify-content-between mb-3 d-none d-lg-flex">
                                <LineaBotones></LineaBotones>
                                {Next === 0 ? <BotonFormulario active>Personales</BotonFormulario> : <BotonFormulario onClick={() => setSiguiente(0)}>Personales</BotonFormulario>}
                                {Next === 1 ? <BotonFormulario active>Contacto</BotonFormulario> : <BotonFormulario onClick={() => setSiguiente(1)}>Contacto</BotonFormulario>}
                                {Next === 2 ? <BotonFormulario active>Registro</BotonFormulario> : <BotonFormulario onClick={() => setSiguiente(2)}>Registro</BotonFormulario>}
                                {Next === 3 ? <BotonFormulario active>Cuenta</BotonFormulario> : <BotonFormulario onClick={() => setSiguiente(3)}>Cuenta</BotonFormulario>}
                            </div>
                            <div className="col-12 justify-content-evenly mb-3 d-flex d-lg-none">
                                {Next === 0 ? <BotonFormulario active>1</BotonFormulario> : <BotonFormulario onClick={() => setSiguiente(0)}>1</BotonFormulario>}
                                {Next === 1 ? <BotonFormulario active>2</BotonFormulario> : <BotonFormulario onClick={() => setSiguiente(1)}>2</BotonFormulario>}
                                {Next === 2 ? <BotonFormulario active>3</BotonFormulario> : <BotonFormulario onClick={() => setSiguiente(2)}>3</BotonFormulario>}
                                {Next === 3 ? <BotonFormulario active>4</BotonFormulario> : <BotonFormulario onClick={() => setSiguiente(3)}>4</BotonFormulario>}
                            </div>
                        </div>
                        <ContenedorMayor>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {Next === 0 &&
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">Nombre</label>
                                            <InputCont type="text" className="col-12" {...register("name")} />
                                            {errors?.name && (<div className="mt-2 alert alert-danger" role="alert">{errors.name.message}</div>)}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">Primer Apellido</label>
                                            <InputCont type="text" className="col-12" {...register("lastnameA")} />
                                            {errors?.lastnameA && (<div className="mt-2 alert alert-danger" role="alert">{errors.lastnameA.message}</div>)}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">Segundo Apellido</label>
                                            <InputCont type="text" className="col-12" {...register("lastnameB")} />
                                            {errors?.lastnameB && (<div className="mt-2 alert alert-danger" role="alert">{errors.lastnameB.message}</div>)}
                                        </div>
                                        <label className="form-label mb-1">Documento de Identificación</label>
                                        <div className="mb-3 d-md-flex">
                                            <SelectorA className="flex-md-fill col-12 me-md-3" style={{ "width": "180px" }} {...register("personalIDtype")}>
                                                <option defaultValue>C.C.</option>
                                                <option value="T.I.">T.I.</option>
                                                <option value="NIT">NIT</option>
                                            </SelectorA>
                                            <InputCont type="text" className="flex-md-fill col-12 mt-2 mt-md-0" {...register("personalID")} />
                                        </div>
                                        {errors?.personalID && (<div className="mt-2 alert alert-danger" role="alert">{errors.personalID.message}</div>)}
                                        <div className="d-flex justify-content-center mt-4 pt-2">
                                            <BotonMorado type="button" onClick={siguiente}>Siguiente</BotonMorado>
                                        </div>
                                    </>
                                }
                                {Next === 1 &&
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">Celular</label>
                                            <InputCont type="text" className="col-12" {...register("celular")} />
                                            {errors?.celular && (<div className="mt-2 alert alert-danger" role="alert">{errors.celular.message}</div>)}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">Teléfono o Celular 2</label>
                                            <InputCont type="text" className="col-12" {...register("celular2")} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">Dirección</label>
                                            <InputCont type="text" className="col-12" {...register("direccion")} />
                                        </div>
                                        <label className="form-label mb-1">Ubicación</label>
                                        <div className="mb-3 d-md-flex">
                                            <SelectorA className="flex-md-fill col-12 me-md-3" {...register("ciudad")}>
                                                <option defaultValue>Pitalito</option>
                                                <option value="Neiva">Neiva</option>
                                                <option value="La plata">La plata</option>
                                            </SelectorA>
                                            <SelectorA className="flex-md-fill col-12 mt-2 mt-md-0" {...register("departamento")}>
                                                <option defaultValue>Huila</option>
                                                <option value="Caqueta">Caqueta</option>
                                                <option value="Cauca">Cauca</option>
                                            </SelectorA>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4 pt-2">
                                            <BotonMorado type="button" onClick={atras}>Atrás</BotonMorado>
                                            <BotonMorado type="button" onClick={siguiente}>Siguiente</BotonMorado>
                                        </div>
                                    </>
                                }
                                {Next === 2 &&
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">Fecha de Nacimiento</label>
                                            <Controller control={control} name='datebirth'
                                                render={({ field }) => (
                                                    <InputContB>
                                                        <DatePicker
                                                            locale={locale}
                                                            selected={field.value}
                                                            onChange={(date) => field.onChange(date)}
                                                            dateFormat="dd 'de' MMMM 'del' yyyy"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            maxDate={addDays(new Date(), 0)}
                                                        />
                                                    </InputContB>
                                                )}
                                            />
                                            {errors?.datebirth && (<div className="mt-2 alert alert-danger" role="alert">{errors.datebirth.message}</div>)}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">Inicio del Embarazo</label>
                                            <Controller control={control} name='embarazo'
                                                render={({ field }) => (
                                                    <InputContB>
                                                        <DatePicker
                                                            locale={locale}
                                                            selected={field.value}
                                                            onChange={(date) => field.onChange(date)}
                                                            dateFormat="dd 'de' MMMM 'del' yyyy"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            maxDate={addDays(new Date(), 0)}
                                                        />
                                                    </InputContB>
                                                )}
                                            />
                                            {errors?.embarazo && (<div className="mt-2 alert alert-danger" role="alert">{errors.embarazo.message}</div>)}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">EPS</label>
                                            <InputCont type="text" className="col-12" {...register("EPS")} />
                                            {errors?.EPS && (<div className="mt-2 alert alert-danger" role="alert">{errors.EPS.message}</div>)}
                                        </div>
                                        <label className="form-label mb-1">Grupo Sanguineo</label>
                                        <div className="mb-3 d-md-flex">
                                            <InputCont type="text" className="flex-md-fill col-12 me-md-3" placeholder="A, B, AB, ..." {...register("bloodType")} />
                                            <SelectorA className="flex-md-fill col-12 mt-2 mt-md-0" {...register("blood")}>
                                                <option defaultValue>+</option>
                                                <option value="-">-</option>
                                            </SelectorA>
                                        </div>
                                        {errors?.bloodType && (<div className="mt-2 alert alert-danger" role="alert">{errors.bloodType.message}</div>)}

                                        <label className="form-label mb-1" >Recomendaciones</label>
                                        <div className="mb-3">
                                            <InputText className="col-12" rows="3" {...register("recomendacion")}></InputText>
                                        </div>

                                        <div className="d-flex justify-content-between mt-4 pt-2">
                                            <BotonMorado type="button" onClick={atras}>Atrás</BotonMorado>
                                            <BotonMorado type="button" onClick={siguiente}>Siguiente</BotonMorado>
                                        </div>
                                    </>
                                }
                                {Next === 3 &&
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">Correo Electrónico</label>
                                            <InputCont type="email" className="col-12" {...register("email")} />
                                            {errors?.email && (<div className="mt-2 alert alert-danger" role="alert">{errors.email.message}</div>)}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label mb-1 me-1">Contraseña</label>
                                            <PopoverElement textos={'Este campo no es editable, debes ingresar una nueva contraseña.'} />
                                            <InputCont type="password" className="col-12" {...register("password")} />
                                            {errors?.password && (<div className="mt-2 alert alert-danger" role="alert">{errors.password.message}</div>)}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">Confirmar Contraseña</label>
                                            <InputCont type="password" className="col-12" {...register("passwordConfirmation")} />
                                            {errors?.passwordConfirmation && (<div className="mt-2 alert alert-danger" role="alert">{errors.passwordConfirmation.message}</div>)}
                                        </div>

                                        <div className="d-flex justify-content-between mt-4 pt-2">
                                            <BotonMorado type="button" onClick={atras}>Atrás</BotonMorado>
                                            <BotonMorado type="button" onClick={handleSubmit(onSubmit)}>Editar</BotonMorado>
                                        </div>
                                    </>
                                }
                            </form>
                        </ContenedorMayor>
                    </div>
                </div>
            </div>
            <Fondo />
        </>
    );
}

export default EditarAgenda;