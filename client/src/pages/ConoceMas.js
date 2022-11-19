import React from 'react';
import { Helmet } from "react-helmet";
import { ReactComponent as UsuarioLogo } from './../images/UsuarioLogo.svg';
import { ReactComponent as SobreEmail } from './../images/ImagesHome/SobreEmail.svg';
import { ReactComponent as MensajePencil } from './../images/ImagesHome/MensajePencil.svg';
import { ReactComponent as AlertaRedonda } from './../images/AlertaRedonda.svg';
import theme from '../theme';
import Fondo from '../elements/Fondo';
import { useForm } from 'react-hook-form';
import ContactoAydaResolver from '../validations/ContactoAydaResolver';
import { notError, notExito } from '../elements/notifyToasty';
import routes from '../helpers/Routes';
import { useNavigate } from 'react-router-dom';
import useContactHelp from '../hooks/useContactHelp';

const ConoceMas = () => {
    const [ContactHelp] = useContactHelp();
    const navigate = useNavigate();

    const { register, handleSubmit, formState, reset } = useForm({ resolver: ContactoAydaResolver });
    const { errors } = formState;

    const onSubmit = async (formData) => {
        const res = await ContactHelp(formData)
        if (res.message) {
            notExito({ textoNot: res.message })
            navigate(routes.home)
            reset();
        } else {
            notError({ textoNot: res.error })
        }
    }

    return (
        <>
            <Helmet><title>Contacto & Ayuda</title></Helmet>
            <div className="container py-5">
                <div className="row d-flex h-100">
                    <div className="col-11 col-md-7 mx-auto my-auto">
                        <h1 className="h2 mb-4 text-center text-primary" style={{ "fontWeight": "700" }}>Contacto & Ayuda</h1>
                        <form className="py-2" onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group mb-3">
                                <UsuarioLogo className="input-group-text" width="45px" style={{ "fill": theme.moradoOscuro }} />
                                <input type="name" className="form-control" placeholder="Nombre" {...register("nameUser")} />
                            </div>
                            {errors?.name && (<div className="mt-2 alert alert-danger" role="alert">{errors.name.message}</div>)}
                            <div className="input-group mb-3">
                                <SobreEmail className="input-group-text" width="45px" style={{ "fill": theme.moradoOscuro }} />
                                <input type="email" className="form-control" id="exampleFormControlInput1"
                                    placeholder="email@ejemplo.com" {...register("email")} />
                            </div>
                            {errors?.email && (<div className="mt-2 alert alert-danger" role="alert">{errors.email.message}</div>)}
                            <div className="input-group mb-3">
                                <AlertaRedonda className="input-group-text" width="45px" style={{ "fill": theme.moradoOscuro }} />
                                <select className="form-select" {...register("optionSelected")}>
                                    <option defaultValue>Petición</option>
                                    <option value="Queja">Queja</option>
                                    <option value="Reclamo">Reclamo</option>
                                    <option value="Sugerencia">Sugerencia</option>
                                    <option value="Denuncia">Denuncia</option>
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <MensajePencil className="input-group-text" width="45px" style={{ "fill": theme.moradoOscuro }} />
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                    placeholder="Mensaje" {...register("mensaje")}></textarea>
                            </div>
                            {errors?.mensaje && (<div className="mt-2 alert alert-danger" role="alert">{errors.mensaje.message}</div>)}
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Contactar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Fondo />
        </>
    );
}

export default ConoceMas;