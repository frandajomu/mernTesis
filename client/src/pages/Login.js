import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import theme from '../theme';
import { useForm } from 'react-hook-form';
import { ReactComponent as UsuarioLogo } from './../images/UsuarioLogo.svg';
import { ReactComponent as CerrarPagina } from './../images/CerrarPagina.svg';
import { ReactComponent as CruzCierre } from './../images/CruzCierre.svg';
import { BotonMoradoModal } from '../elements/Botones';
import useModal from '../hooks/useModal';
import routes from '../helpers/Routes';
import { notExito } from '../elements/notifyToasty';

const userCredentials = {};

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState, reset } = useForm();
    const { errors } = formState;

    const [recContra, olvide, cancelar] = useModal();
    const handleRedirect = () => navigate(routes.home);

    const onSubmit = (formData) => {
        //formData funcionara para enviar los datos al Backend
        if (!recContra) {
            console.log(formData)
            login(userCredentials);
            reset();
        } else {
            console.log(formData)
            navigate('/');
            notExito({ textoNot: "Revisa tu correo electrónico para continuar con la recuperación." });
        }
    }


    return (
        <Contenedor className="text-center">
            <CerrarLogo type="button" className="d-none d-sm-block" onClick={handleRedirect} />

            <IngresoForm className="form-signin px-4">
                <CruzCierreLogo type="button" className="d-block d-sm-none" onClick={handleRedirect} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <LogoUsuario />
                    {!recContra ? <TituloForm className="h3 mt-2 mb-3">Log in</TituloForm>
                        : <TituloForm className="h5 mt-2 mb-3">Recuperar Contraseña</TituloForm>}

                    <FlotanteForm className="form-floating my-2">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"  {...register("email")} />
                        <label htmlFor="floatingInput">Correo electrónico</label>
                    </FlotanteForm>

                    {!recContra &&
                        <FlotanteForm className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" {...register("password")} />
                            <label htmlFor="floatingPassword">Contraseña</label>
                        </FlotanteForm>
                    }

                    {!recContra &&
                        <ParraForm type="button" onClick={olvide}> ¿Olvidaste la contraseña? </ParraForm>
                    }

                    <BotonMoradoModal className="w-100 btn mt-3" type="submit" onClick={handleSubmit(onSubmit)}>{!recContra ? 'Ingresar' : 'Recuperar Contraseña'}</BotonMoradoModal>

                    {!recContra &&
                        <Checkbox Checkbox className="checkbox my-2">
                            <label><input type="checkbox" value="remember-me" {...register("checkbox")} /> Mantener la sesión iniciada</label>
                        </Checkbox>
                    }

                    {recContra &&
                        <ParraForm type="button" onClick={cancelar}>¿Ya tienes tu contaseña y deseas iniciar sesión?</ParraForm>
                    }
                </form>
            </IngresoForm>
        </Contenedor >
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

const ParraForm = styled.p`
    margin-top: 0.8em;
    margin-bottom: 0;
    color:${theme.moradoClaro};    
    &:hover{
        color:${theme.moradoOscuro};

    }
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

const CruzCierreLogo = styled(CruzCierre)`
    display: flex;
    fill:  ${theme.moradoOscuro} ;
    width: 1.2rem;
`;