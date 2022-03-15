import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../theme';
import { ReactComponent as BuscarIcon } from './../images/BuscarIcon.svg';
import { ReactComponent as DropdownIcono } from './../images/DropdownIcono.svg';

const SearchBar = () => {
    const [option, setOption] = useState("nombre");

    return (
        <>
            <Caja className="focus">
                <form name="search">
                    <SearchIn type="text" name="txt" placeholder={`Buscar por ${option}`}
                        onmouseout="document.search.txt.value = ''" />
                </form>
                <Icon />
                <IconDropdown type="button" data-bs-toggle="dropdown" aria-expanded="false" />
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><span className="dropdown-item" onClick={() => setOption('nombre')}>Por nombre</span></li>
                    <li><span className="dropdown-item"  onClick={() => setOption('c.c.')}>Por c.c.</span></li>
                </ul>
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

const IconDropdown = styled(DropdownIcono)`
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translate(0,-50%);
    width: 15px;
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
