import React, { useState } from 'react';
import { ReactComponent as LogoADN } from './../../images/LogoADN.svg';
import { ReactComponent as Bars } from './../../images/bars.svg';
import { ReactComponent as MenuCerrar } from './../../images/MenuCerrar.svg';
import theme from '../../theme';
import { Link } from 'react-router-dom';
import routes from '../../helpers/Routes';
import NavBarRenderRoles from '../../helpers/NavBarRenderRoles';
import { BotonMenu } from '../../helpers/NavBarLogin';
import './BarraSinToggle.css';

const NavB = ({hijoB}) => {
    const [estaActivo, setActivo] = useState(false);
    const SiderbarClick = () => setActivo(!estaActivo);
    return (
        <div>
            <div className="wrapper">
                <div id="content" className="container-flex">
                    <nav className="navbar navbar-expand-lg navbar-dark" style={{ 'backgroundColor': theme.moradoClaro }}>
                        <div className="container py-lg-0 pe-lg-5 ps-lg-5">
                            <Link to={routes.home} >
                                <LogoADN className="py-1 py-lg-0" alt="ADNLogo" width="185" />
                            </Link>
                            <ul className="navbar-nav ms-auto mb-lg-0 d-none d-md-block">
                                <li className="nav-item">
                                    <Link to={routes.home} className="nav-link me-3" aria-current="page">Inicio</Link>
                                </li>
                            </ul>
                            <Bars type="button" id="sidebarCollapse" alt="" width="25" onClick={SiderbarClick} />
                        </div>
                    </nav>
                    {hijoB}
                </div>

                <nav id="sidebar" className={estaActivo ? "active" : null}>
                    <div id="dismiss" onClick={SiderbarClick}>
                        <MenuCerrar width="20px" style={{"fill":"#ffff"}}/>
                    </div>
                    <div className="sidebar-header">

                    </div>

                    <ul className="list-unstyled components">
                        <NavBarRenderRoles />
                        <li>
                            <a href="#Conoce" data-bs-toggle="collapse" aria-expanded="false">Conoce más</a>
                            <ul className="collapse list-unstyled" id="Conoce">
                                <li><Link to={routes.conoceMas}>Contacto & Ayuda</Link></li>
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
            <div className={`overlay ${estaActivo ? "active" : null}`} onClick={SiderbarClick}></div>
        </div>
    );
}

export default NavB;