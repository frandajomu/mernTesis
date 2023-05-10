import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../theme';

const BotonBlanco = styled(Link)`
    background: ${theme.moradoOscuro};
    color: #ffff;
    border: none;
    border-radius: 30px;
    padding: 0.1rem 0.9rem;
    
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    align-items: center;
    outline: none;
    transition: .3s ease all;
 
    &:hover {
        color: #ffff;
        background: ${theme.moradoClaro}};
    }
`;

const BotonMorado = styled.button`
    background: ${theme.naranjaOscuro};
    color: #ffff;
    border: none;
    border-radius: 30px;
    padding: 0.2rem 1rem;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    align-items: center;
    outline: none;
    transition: .3s ease all;
 
    &:hover {
        color: #ffff;
        background: ${theme.naranjaClaro}};
    }
`;

const BotonMoradoDelineado = styled(Link)`
    border-radius: 30px;
    color: ${theme.moradoOscuro};
    padding: 0.3rem 1.1rem;
    border-width: 2px;
    border-style: solid;
    border-color: ${theme.moradoOscuro};
    
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    align-items: center;
    transition: .3s ease all;
 
    &:hover {
        color: #ffff;
        background: ${theme.moradoOscuro};
    }
`;

const BotonEditar = styled.button`
    border-radius: 30px;
    color: ${theme.moradoOscuro};
    padding: 0.3rem 1.1rem;
    border-width: 1.7px;
    border-style: solid;
    border-color: ${theme.moradoOscuro};
    background: #ffff;
    
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    align-items: center;
    transition: .3s ease all;
 
    &:hover {
        color: #ffff;
        background: ${theme.moradoOscuro};
    }
`;

const BotonEliminar = styled.button`
    border-radius: 30px;
    color: #ffff;
    padding: 0.3rem 1.1rem;
    background: ${theme.naranjaOscuro};
    
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    align-items: center;
    transition: .3s ease all;
 
    &:hover {
        color: #ffff;
        background: ${theme.naranjaClaro};
    }
`;

const BotonNaranjaModal = styled.button`
    color: #ffff;
    background: ${theme.naranjaOscuro};
    cursor: pointer;
    text-decoration: none;
    align-items: center;
    transition: .3s ease all;
 
    &:hover {
        color: #ffff;
        background: ${theme.naranjaClaro};
    }
`;

const BotonMoradoModal = styled.button`
    color: #ffff;
    background: ${theme.naranjaOscuro};
    cursor: pointer;
    text-decoration: none;
    align-items: center;
    transition: .3s ease all;
 
    &:hover {
        color: #ffff;
        background: ${theme.naranjaClaro};
    }
`;

const BotonFormulario = styled.button`
    ${props => props.active ? css` {
        color: #ffff;
        background: ${theme.moradoOscuro};
        border-color: ${theme.moradoOscuro};
    }`: css`{
        color: ${theme.moradoOscuro};
        border-color: ${theme.moradoOscuro};
        background: #ffff;
    }`
    }
    border-radius: 30px;
    padding: 0.2rem 1.1rem;
    border-width: 2px;
    border-style: solid;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    align-items: center;
    transition: .3s ease all;
    z-index: 1;
 
    &:hover {
        color: #ffff;
        background: ${theme.moradoOscuro};
    }

`;

const BotonIconoListaUsers = styled.button`
    outline: none;
    background: ${theme.naranjaOpaco1};
    border: none;
    width: 1.5rem; 
    height: 1.5rem; 
    font-size: 12px;
    cursor: pointer;
    border-radius: 0.31rem; /* 5px */
    transition: .3s ease all;
    display: flex;
    align-items: center;
    justify-content: center;
 
    &:hover {
        background: ${theme.naranjaOpaco2};
    }
 
    svg {
        width: 0.8rem; /* 18px */
        fill: ${theme.naranjaOscuro}
    }
 
    @media (max-width: 50rem) { /* 80px */
        opacity: 1;
    }
`;

export { BotonBlanco, BotonMorado, BotonMoradoDelineado, BotonEditar, BotonEliminar, BotonNaranjaModal, BotonMoradoModal, BotonFormulario, BotonIconoListaUsers };