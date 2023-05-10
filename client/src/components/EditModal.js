import React, { useEffect, useRef } from 'react';
import { BotonMoradoModal } from '../elements/Botones';
import theme from '../theme';
import { Controller, useForm } from 'react-hook-form';
import EditAccountResolver from '../validations/EditAccountResolver';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import useGetMyPerfil from '../hooks/editPerfil/userGetMyPerfil';
import DatePicker from "react-datepicker";
import { addDays, parseISO } from 'date-fns';
import { notError, notExito } from '../elements/notifyToasty';
import { useNavigate } from 'react-router-dom';
import userPutMyPerfil from '../hooks/editPerfil/userPutMyPerfil';
import routes from '../helpers/Routes';

const EditModal = ({ isOpen, cerrado, MyPerfil }) => {

    const [usuario] = useGetMyPerfil();
    const [PutMyPerfil] = userPutMyPerfil();
    const { control, register, handleSubmit, formState, reset } = useForm({ resolver: EditAccountResolver });
    const { errors } = formState;

    //Configuración del modal
    const modalRef = useRef()

    const showModal = () => {
        const modalEle = modalRef.current
        const bsModal = new Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        })
        bsModal.show()
    }
    useEffect(() => { if (isOpen) { showModal() } }, [isOpen])

    const hideModal = () => {
        const modalEle = modalRef.current
        const bsModal = bootstrap.Modal.getInstance(modalEle)
        bsModal.hide()
        reset();
        cerrado();
    }

    //Envio de datos del formulario (Backend)
    const navigate = useNavigate();
    const onSubmit = async (formData) => {
        const res = await PutMyPerfil(formData);
        if (res.message) {
            notExito({ textoNot: res.message })
            navigate(routes.perfil)
            MyPerfil()
            hideModal();
            cerrado();
            reset();
        } else {
            notError({ textoNot: res.error })
        }
    }

    //Cargue inicial de datos de Usuario para edición
    useEffect(() => {
        if (usuario) {
            reset(
                {
                    name: usuario.name,
                    lastnameA: usuario.lastnameA,
                    lastnameB: usuario.lastnameB,
                    personalIDtype: usuario.personalIDtype,
                    personalID: usuario.personalID,
                    datebirth: parseISO(usuario.datebirth),
                    genero: usuario.genero,
                    bloodType: usuario.bloodType,
                    blood: usuario.blood,
                    EPS: usuario.EPS,
                    celular: usuario.celular,
                    celular2: usuario.celular2,
                    direccion: usuario.direccion,
                    ciudad: usuario.ciudad,
                    departamento: usuario.departamento,
                    email: usuario.email,
                    role: usuario.role
                }
            )
        }
    }, [reset, usuario]);

    //Cambio a español para el DayPicker
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',];
    const days = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
    const locale = { localize: { day: n => days[n], month: n => months[n] }, formatLong: { date: () => 'mm/dd/yyyy' } }

    return (
        <div>
            {/* Modal Cambiar Contraseña */}
            <div className="modal fade" ref={modalRef} tabIndex="-1">
                <div className="modal-dialog  modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header" style={{ "backgroundColor": theme.moradoOscuro }}>
                            <div className="col d-flex justify-content-center">
                                <h4 className="modal-title text-light" id="staticBackdropLabel"><b>EDITAR CUENTA</b></h4>
                            </div>
                            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={hideModal}></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center" style={{ "color": theme.moradoOscuro }}>
                            <div className="col-sm-8 col-12">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input type="text" className='form-control disabled' disabled {...register("name")}/>
                                        {errors?.name && (<div className="form-text"><div className="alert alert-danger" role="alert">{errors.name.message}</div></div>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Primer apellido</label>
                                        <input type="text" className="form-control" disabled {...register("lastnameA")} />
                                        {errors?.lastnameA && (<div className="form-text"><div className="alert alert-danger" role="alert">{errors.lastnameA.message}</div></div>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Segundo apellido</label>
                                        <input type="text" className="form-control" disabled {...register("lastnameB")} />
                                        {errors?.lastnameB && (<div className="form-text"><div className="alert alert-danger" role="alert">{errors.lastnameB.message}</div></div>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Correo</label>
                                        <input type="text" className="form-control" {...register("email")} />
                                        {errors?.email && (<div className="form-text"><div className="alert alert-danger" role="alert">{errors.email.message}</div></div>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Tipo de Identificación</label>
                                        <select className="form-select" disabled {...register("personalIDtype")}>
                                            <option defaultValue>C.C.</option>
                                            <option value="T.I.">T.I.</option>
                                            <option value="NIT">NIT</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Número de Identificación</label>
                                        <input type="text" className="form-control" disabled {...register("personalID")} />
                                        {errors?.personalID && (<div className="form-text"><div className="alert alert-danger" role="alert">{errors.personalID.message}</div></div>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label mb-1">Fecha de Nacimiento</label>
                                        <Controller control={control} name='datebirth'
                                            render={({ field }) => (
                                                <DatePicker
                                                    className="form-control"
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
                                            )}
                                        />
                                    </div>
                                    <label className="form-label">Grupo sanguíneo</label>
                                    <div className="mb-3 d-flex">
                                        <input type="text" className="form-control me-2" {...register("bloodType")} />
                                        <select className="form-select" {...register("blood")}>
                                            <option defaultValue>+</option>
                                            <option value="-">-</option>
                                        </select>
                                    </div>
                                    {errors?.bloodType && (<div className="form-text"><div className="alert alert-danger" role="alert">{errors.bloodType.message}</div></div>)}
                                    <div className="mb-3">
                                        <label className="form-label">EPS</label>
                                        <input type="text" className="form-control" {...register("EPS")} />
                                        {errors?.EPS && (<div className="form-text"><div className="alert alert-danger" role="alert">{errors.EPS.message}</div></div>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Celular</label>
                                        <input type="text" className="form-control" {...register("celular")} />
                                        {errors?.celular && (<div className="form-text"><div className="alert alert-danger" role="alert">{errors.celular.message}</div></div>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Celular B</label>
                                        <input type="text" className="form-control" {...register("celular2")} />
                                        {errors?.celular2 && (<div className="form-text"><div className="alert alert-danger" role="alert">{errors.celular2.message}</div></div>)}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Dirección</label>
                                        <input type="text" className="form-control" {...register("direccion")} />
                                        {errors?.direccion && (<div className="form-text"><div className="alert alert-danger" role="alert">{errors.direccion.message}</div></div>)}
                                    </div>
                                    <label className="form-label mb-1">Ubicación</label>
                                    <div className="mb-3 d-md-flex">
                                        <select className="form-select me-2" {...register("ciudad")}>
                                            <option defaultValue>Pitalito</option>
                                            <option value="Neiva">Neiva</option>
                                            <option value="La plata">La plata</option>
                                        </select>
                                        <select className="form-select" {...register("departamento")}>
                                            <option defaultValue>Huila</option>
                                            <option value="Caqueta">Caqueta</option>
                                            <option value="Cauca">Cauca</option>
                                        </select>
                                    </div>
                                    <br></br>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" onClick={hideModal}>Cancelar</button>
                            <BotonMoradoModal type="submit" className="btn" onClick={handleSubmit(onSubmit)}>Aceptar</BotonMoradoModal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;