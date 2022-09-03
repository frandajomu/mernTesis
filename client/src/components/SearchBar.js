import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { ReactComponent as BuscarIcon } from './../images/BuscarIcon.svg';

const SearchBar = ({ setUsuarios, infoList, estado }) => {

    const [wordSearched, setwordSearched] = useState('');
    const filtrar = (wordSearched) => {
        var resultadosBusqueda = infoList.filter((element) => {
            if (estado === 'Ordenado') {
                if (element.name.toString().toLowerCase().includes(wordSearched.toLowerCase()) ||
                    element.personalID.toString().toLowerCase().includes(wordSearched.toLowerCase())) {
                    return element
                } else {
                    return null
                }
            } else {
                if (element.idUser.name.toString().toLowerCase().includes(wordSearched.toLowerCase()) ||
                    element.idUser.personalID.toString().toLowerCase().includes(wordSearched.toLowerCase())) {
                    return element
                } else {
                    return null
                }
            }
        })
        setUsuarios(resultadosBusqueda);
    }

    const handleChange = async (e) => {
        setwordSearched(e.target.value);
        filtrar(e.target.value);
    }

    return (
        <>
            <Caja className="focus">
                <SearchIn
                    type="text"
                    name="Browser"
                    placeholder={'Buscar'}
                    value={wordSearched}
                    onChange={handleChange}
                />
                <Icon />
            </Caja>
        </>
    );
}

export default SearchBar;

const Icon = styled(BuscarIcon)`
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translate(0,-50%);
    width: 25px;
    fill: ${theme.moradoOscuro};
    transition: .2s;
`;


const SearchIn = styled.input`
    padding: 10px;
    padding-left: 50px;
    width: 250px;
    height: 39px;
    background: none;
    border: 2px solid ${theme.moradoOscuro};
    border-radius: 50px;
    box-sizing: border-box;
    font-size: 18px;
    color: ${theme.moradoOscuro};
    outline: none;
    transition: .5s;
    font-weight: 500;
`
    ;
const Caja = styled.div`
    position: relative;
    &:hover ${Icon} {
        transform: translate(-20%,-50%);
    }
`;
