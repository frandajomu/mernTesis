import styled from 'styled-components';
import theme from '../theme';

const ContenedorMayor = styled.div`
    border-radius: 30px;
    color: ${theme.moradoOscuro};
    border-width: 2px;
    border-style: solid;
    border-color: ${theme.moradoOscuro};
    padding: ${(props) => props.lista ? '2rem 2.8rem' : '2.2rem 2.5rem'};
    font-size: 18px;
    font-weight: 500;
    background: #ffff;
    @media (max-width: 420px) {
        border-width: ${(props) => props.lista ? '0px' : '2px'};
    }
`;

const InputCont = styled.input`
    border-radius: 30px;
    padding: 0.2rem 1rem;
    border-width: 2px;
    border-style: solid;
    border-color: ${theme.moradoOscuro};
    font-size: 18px;
    font-weight: 500;
`;

const InputText = styled.textarea`
    border-radius: 25px;
    padding: 0.3rem 1.1rem;
    border-width: 2px;
    border-style: solid;
    border-color: ${theme.moradoOscuro};
    font-size: 18px;
    font-weight: 500;
`;

const MostrarText = styled.span`
    border-radius: 25px;
    padding: 0.3rem 1.1rem;
    border-width: 2px;
    border-style: solid;
    border-color: ${theme.moradoOscuro};
    font-size: 0.9rem;
    font-weight: 500;
`;

const SelectorA = styled.select`
    border-radius: 30px;
    padding: ${(props) => props.exam ? '0.2rem 1rem' : '0.2rem 1.5rem'}; 
    border-width: 2px;
    border-style: solid;
    border-color: ${theme.moradoOscuro};
    font-weight: 500;
    text-align: center;
`;

const SelectTabla = styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    outline: none;
    color: ${theme.moradoOscuro};
    font-weight: 700;
    text-align: left;
`;

const LineaBotones = styled.div`
    position: absolute;
    top: 10rem;
    height: 2px;
    width: ${(props) => props.exam ? '20%' : '45%'};
    background-color: ${theme.moradoOscuro};
`;

const InputContB = styled.div`
    input {
        box-sizing: border-box;
        border-radius: 30px;
        padding: 0.2rem 1.1rem;
        border-width: 2px;
        border-style: solid;
        border-color: ${theme.moradoOscuro};
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        text-align: center;
        width: 100%;
        align-items: center;
        justify-content: center;
        &:focus { 
          outline: none !important;
        }
    }
`;

/* Contendedores Lista de Usuarios */
const DataUsuario = styled.td`
    border-radius: 30px;
    padding: 0.2rem 1rem;
    border-width: 2px;
    border-style: solid;
    border-color: ${theme.moradoOscuro};
    font-size: 18px;
    font-weight: 500;
`;

const Checkbox = styled.div`
    font-weight: 400;
    color: ${theme.moradoOscuro};
`;

export { ContenedorMayor, SelectTabla, InputCont, InputText, MostrarText, SelectorA, LineaBotones, InputContB, DataUsuario, Checkbox };