import React, { useState } from 'react';
import { ReactComponent as LogoADN } from './../../../images/LogoADN.svg';
import { ReactComponent as Bars } from './../../../images/bars.svg';
import theme from '../../../theme';
import { Link } from 'react-router-dom';
import routes from '../../../helpers/Routes';
import NavBarRenderRoles from '../../../helpers/NavBarRenderRoles';
import { BotonBarra, BotonMenu } from '../../../helpers/NavBarLogin';
import './NavBarA.css';

const NavA = ({hijoA}) => {
    const [estaActivo, setActivo] = useState(false);
    const SiderbarClick = () => setActivo(!estaActivo);
    return (
        <div>
            <div className="wrapper">
                <div id="content" className="container-flex">
                    <nav className="navbar navbar-expand-lg navbar-dark" style={{ 'backgroundColor': theme.moradoOscuro }}>
                        <div className="container py-lg-0 pe-lg-5 ps-lg-5">
                            <Link to={routes.home} >
                                <LogoADN className="py-1 py-lg-0" alt="ADNLogo" width="185" />
                            </Link>
                            <ul className="navbar-nav ms-auto mb-lg-0 d-none d-md-block">
                                <li className="nav-item">
                                    <Link to={routes.home} className="nav-link me-3" aria-current="page">Inicio</Link>
                                </li>
                            </ul>
                            <BotonBarra />
                            <Bars type="button" id="sidebarCollapse" alt="" width="25" onClick={SiderbarClick} />
                        </div>
                    </nav>
                    {hijoA}
                </div>

                <nav id="sidebar" className={estaActivo ? "active" : null}>
                    <div className="sidebar-header">

                    </div>

                    <ul className="list-unstyled components">
                        <NavBarRenderRoles />
                        <li>
                            <a href="#Conoce" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Conoce más</a>
                            <ul className="collapse list-unstyled" id="Conoce">
                                <li><Link to={routes.conoceMas}>Acerca de la Prueba</Link></li>
                                <li><a target="_blank" href="https://www.huila.gov.co/salud/" rel="noopener noreferrer">Secretaria de salud del huila</a></li>
                                <li><a target="_blank" href="https://www.huila.gov.co/" rel="noopener noreferrer">Gobernación del Huila</a></li>
                                <li><a target="_blank" href="https://www.minsalud.gov.co" rel="noopener noreferrer">Ministerio de salud</a></li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="list-unstyled CTAs">
                        <BotonMenu />
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default NavA;