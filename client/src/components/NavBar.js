import React, { useEffect, useState } from 'react';
import NavA from './NavBarComponents/NavBarA/NavBarA.js';
import BarraSinToggle from './BarraSinToggle/BarraSinToggle.js';

const NavBar = ({ contenido }) => {
    //Obteniendo la resolución de la pantalla
    const [width, setWidth] = useState(window.innerWidth);
    const updateDimensions = () => setWidth(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    if (width <= 700) {
        return (
            <BarraSinToggle hijoB={contenido} />
        );
    } else {
        return (
            <NavA hijoA={contenido}/>
        );
    }
}

export default NavBar;
