import styled from 'styled-components';
import theme from '../theme';

const ContenedorMayor = styled.div`
    border-radius: 30px;
    color: ${theme.moradoOscuro};
    border-width: 2px;
    border-style: solid;
    border-color: ${theme.moradoOscuro};
    padding: 2.2rem 2.5rem;
    font-size: 18px;
    font-weight: 500;
    background: #ffff;
`;

const InputCont = styled.input`
    border-radius: 30px;
    color: ${theme.moradoOscuro};
    padding: 0.2rem 1rem;
    border-width: 2px;
    border-style: solid;
    border-color: ${theme.moradoOscuro};
    font-size: 18px;
    font-weight: 500;
`;

const SelectorA = styled.select`
    border-radius: 30px;
    color: ${theme.moradoOscuro};
    padding: 0.2rem 2rem;
    border-width: 2px;
    border-style: solid;
    border-color: ${theme.moradoOscuro};
    font-weight: 500;
    text-align: center;
`;

const LineaBotones = styled.div`
    position: absolute;
    top: 10rem;
    height: 2px;
    width: 45%;
    background-color: ${theme.moradoOscuro};
`;

const InputContB = styled.div`
    input {
        box-sizing: border-box;
        border-radius: 30px;
        color: ${theme.moradoOscuro};
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

export {ContenedorMayor, InputCont, SelectorA, LineaBotones, InputContB};