import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import theme from '../theme';
import { useForm } from 'react-hook-form';
import { ReactComponent as UsuarioLogo } from './../images/UsuarioLogo.svg';
import { ReactComponent as CerrarPagina } from './../images/CerrarPagina.svg';
import { BotonMoradoModal } from '../elements/Botones';
import useModal from '../hooks/useModal';

const userCredentials = {};

const Login = ({ cerrarLogin }) => {
    const { login } = useAuth();
    const location = useLocation();

    const { register, handleSubmit, formState, reset } = useForm();
    const { errors } = formState;

    const onSubmit = (formData) => {
        //formData funcionara para enviar los datos al Backend
        console.log(formData)
        login(userCredentials, location.state?.from);
        cerrarLogin();
        reset();
    }

    const [handleChange, olvide, cancelar ] = useModal();

    return (
        <Contenedor className="text-center">
            <CerrarLogo type="button" onClick={cerrarLogin} />
            <IngresoForm className="form-signin px-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <LogoUsuario />
                    <TituloForm className="h3 mt-2 mb-3">Log in</TituloForm>

                    <FlotanteForm className="form-floating my-2">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"  {...register("email")} />
                        <label htmlFor="floatingInput">Correo electrónico</label>
                    </FlotanteForm>
                    <FlotanteForm className="form-floating mb-2">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" {...register("password")} />
                        <label htmlFor="floatingPassword">Contraseña</label>
                    </FlotanteForm>

                    <p type="button" onClick={olvide}> Olvide la contraseña </p>
                    <BotonMoradoModal className="w-100 btn mt-3" type="submit" onClick={handleSubmit(onSubmit)}>Ingresar</BotonMoradoModal>
                    <Checkbox className="checkbox my-2">
                        <label><input type="checkbox" value="remember-me" {...register("checkbox")}/> Mantener la sesión iniciada</label>
                    </Checkbox>
                </form>
            </IngresoForm>
        </Contenedor>
    )
}

export default Login;

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

const Checkbox = styled.div`
    font-weight: 400;
    color: ${theme.moradoOscuro};
`;

const FlotanteForm = styled.div`
    color: ${theme.moradoOscuro};
    
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

const CerrarLogo = styled(CerrarPagina)`
    position:absolute;
    fill: #ffff;
    width: 1.5rem;
    top: 12%;  /* position the top  edge of the element at the middle of the parent */
    right: 92%; /* position the left edge of the element at the middle of the parent */
    transform: translate(-50%, -50%);
`;