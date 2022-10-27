import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../theme';
import { useForm } from 'react-hook-form';
import { ReactComponent as UsuarioLogo } from './../images/UsuarioLogo.svg';
import { BotonMoradoModal } from '../elements/Botones';
import routes from '../helpers/Routes';
import { notError, notExito } from '../elements/notifyToasty';
import ResetResolver from '../validations/ResetResolver';
import userUpdatePassword from '../hooks/ResetPass/userUpdatePassword';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState, reset } = useForm({ resolver: ResetResolver });
    const { errors } = formState;

    //Reset Password
    const [changePass] = userUpdatePassword();
    const { id, token } = useParams();
    
    const onSubmit = async (formData) => {
        formData.id = id;
        formData.token = token;
        const res = await changePass(formData)
        if (res.message) {
            notExito({ textoNot: res.message })
            navigate(routes.home)
            reset();
        } else {
            notError({ textoNot: res.error })
            navigate(routes.home)
        }
    }


    useEffect(() => {
        reset();
    }, [reset])

    return (
        <Contenedor className="text-center">
            <IngresoForm className="form-signin px-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <LogoUsuario />
                    <TituloForm className="h3 mt-2 mb-3">Nueva Contraseña</TituloForm>

                    <FlotanteForm className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" {...register("password")} />
                        <label htmlFor="floatingPassword">Nueva Contraseña</label>
                        {errors?.password && <div className="mt-2 alert alert-danger" role="alert">{errors.password.message}</div>}
                    </FlotanteForm>

                    <FlotanteForm className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword2" placeholder="Password2" {...register("passwordConfirmation")} />
                        <label htmlFor="floatingPassword2">Confirmar Contraseña</label>
                        {errors?.passwordConfirmation && <div className="mt-2 alert alert-danger" role="alert">{errors.passwordConfirmation.message}</div>}
                    </FlotanteForm>

                    <BotonMoradoModal className="w-100 btn mt-3" onClick={handleSubmit(onSubmit)}>Aceptar</BotonMoradoModal>
                </form>
            </IngresoForm>
        </Contenedor >
    )
}

export default ResetPassword;

const Contenedor = styled.div`
    font-size: 0.9em;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: ${theme.moradoOscuro};
`;

const IngresoForm = styled.div`
    width: 100%;
    max-width: 380px;
    padding-top: 40px;
    padding-bottom: 40px;
    margin: auto;
    background: #ffff;
    border-radius: 20px;
`;

const FlotanteForm = styled.div`
    color: ${theme.moradoOscuro};
    margin-top: 15px;
    
    &:focus-within {
        z-index: 30;
    }
`;

const TituloForm = styled.h1`
    color:${theme.moradoOscuro};
`;

const LogoUsuario = styled(UsuarioLogo)`
    fill: ${theme.moradoOscuro};
    width: 30%;
`;