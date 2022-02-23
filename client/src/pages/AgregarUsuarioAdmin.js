import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ContenedorMayor, InputCont, InputContB, LineaBotones, SelectorA } from '../elements/Agregar';
import { BotonFormulario, BotonMorado } from '../elements/Botones';
import Fondo from '../elements/Fondo';
import roles from '../helpers/Roles';
import { Helmet } from "react-helmet";
import { addDays } from 'date-fns';
import AgregarUsuarioResolver from '../validations/AgregarUsuarioResolver';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { notError } from '../elements/notifyToasty';
//import fromUnixTime from 'date-fns/fromUnixTime'
//import getUnixTime from 'date-fns/getUnixTime';

const AgregarUsuarioAdmin = () => {

    //Uso del hook useForm para adquirir los datos del Formulario
    const { control, register, handleSubmit, formState, reset } = useForm({ resolver: AgregarUsuarioResolver });
    const { errors } = formState;

    //Envio de datos al backend
    const onSubmit = (formData) => {
        //formData funcionara para enviar los datos al Backend
        console.log(formData);
        reset();
    }

    //Logica Renderización de Formulario
    const [Next, setSiguiente] = useState(0);
    const siguiente = () => setSiguiente(Next + 1);
    const atras = () => setSiguiente(Next - 1);

    //Cambio a español para el DayPicker
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',];
    const days = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
    const locale = { localize: { day: n => days[n], month: n => months[n] }, formatLong: { date: () => 'mm/dd/yyyy' } }

    return (
        <>
            <Helmet><title>Agregar Usuario</title></Helmet>
            <div className="container py-4">
                <div className="row">
                    <div className="col-11 col-md-7 mx-auto my-auto">
                        <h1 className="h2 mb-4 text-center text-primary" style={{ "fontWeight": "700" }}>Agregar Usuario</h1>
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
                                                <option value="1">T.I.</option>
                                                <option value="2">NIT</option>
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
                                                <option value="1">Neiva</option>
                                                <option value="2">La plata</option>
                                            </SelectorA>
                                            <SelectorA className="flex-md-fill col-12 mt-2 mt-md-0" {...register("departamento")}>
                                                <option defaultValue>Huila</option>
                                                <option value="1">Caqueta</option>
                                                <option value="2">Cauca</option>
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
                                        <label className="form-label mb-1">Genero</label>
                                        <div className="mb-3">
                                            <SelectorA className="flex-md-fill col-12 mt-2 mt-md-0" {...register("genero")}>
                                                <option defaultValue>Masculino</option>
                                                <option value="1">Femenino</option>
                                            </SelectorA>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">EPS</label>
                                            <InputCont type="text" className="col-12 text-center" {...register("EPS")} />
                                            {errors?.EPS && (<div className="mt-2 alert alert-danger" role="alert">{errors.EPS.message}</div>)}
                                        </div>
                                        <label className="form-label mb-1">Grupo Sanguineo</label>
                                        <div className="mb-3 d-md-flex">
                                            <InputCont type="text" className="flex-md-fill col-12 me-md-3" placeholder="A, B, AB, ..." {...register("bloodType")} />
                                            <SelectorA className="flex-md-fill col-12 mt-2 mt-md-0" {...register("blood")}>
                                                <option defaultValue>+</option>
                                                <option value="1">-</option>
                                            </SelectorA>
                                        </div>
                                        {errors?.bloodType && (<div className="mt-2 alert alert-danger" role="alert">{errors.bloodType.message}</div>)}
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
                                            <label className="form-label mb-1">Contraseña</label>
                                            <InputCont type="password" className="col-12" {...register("password")} />
                                            {errors?.password && (<div className="mt-2 alert alert-danger" role="alert">{errors.password.message}</div>)}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label mb-1">Confirmar Contraseña</label>
                                            <InputCont type="password" className="col-12" {...register("passwordConfirmation")} />
                                            {errors?.passwordConfirmation && (<div className="mt-2 alert alert-danger" role="alert">{errors.passwordConfirmation.message}</div>)}
                                        </div>
                                        <label className="form-label mb-1">Rol de Usuario</label>
                                        <div className="mb-3">
                                            <SelectorA className="flex-md-fill col-12 mt-2 mt-md-0" {...register("role")}>
                                                {Object.keys(roles).map(role => (
                                                    <option key={role}>{role}</option>
                                                ))}
                                            </SelectorA>
                                            {errors?.role && (<div className="mt-2 alert alert-danger" role="alert">{errors.role.message}</div>)}
                                        </div>
                                        <div className="d-flex justify-content-between mt-4 pt-2">
                                            <BotonMorado type="button" onClick={atras}>Atrás</BotonMorado>
                                            <BotonMorado type="button" onClick={handleSubmit(onSubmit)}>Crear</BotonMorado>
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

export default AgregarUsuarioAdmin;