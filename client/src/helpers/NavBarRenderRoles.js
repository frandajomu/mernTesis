import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import roles from './Roles';
import { Link } from 'react-router-dom';
import routes from './Routes';

const NavBarRenderRoles = () => {
    const { usuario } = useAuth();

    if (usuario?.role === roles.medico) {
        return (
            <>
                <p>{usuario?.role}</p>
                <li className="d-block d-md-none"><Link to={routes.home}>Inicio</Link></li>
                <li>
                    <a href="#Exam" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Exámenes</a>
                    <ul className="collapse list-unstyled" id="Exam">
                        <li><Link to={routes.agendar}>Agendar Prueba</Link></li>
                        <li><Link to={routes.agendado}>Ver Pruebas</Link></li>
                    </ul>
                </li>
                <li><Link to={routes.estadisticas}>Estadísticas</Link></li>
                <li><Link to={routes.manual.medico}>Manual del médico</Link></li>
                <li><Link to={routes.perfil}>Perfil</Link></li>
            </>
        );
    } else if (usuario?.role === roles.laboratorio) {
        return (
            <>
                <p>{usuario?.role}</p>
                <li className="d-block d-md-none"><Link to={routes.home}>Inicio</Link></li>
                <li>
                    <a href="#Exam" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Exámenes</a>
                    <ul className="collapse list-unstyled" id="Exam">
                        <li><Link to={routes.agendado}>Ver Pruebas</Link></li>
                    </ul>
                </li>
                <li><Link to={routes.estadisticas}>Estadísticas</Link></li>
                <li><Link to={routes.manual.laboratorio}>Manual del laboratorio</Link></li>
                <li><Link to={routes.perfil}>Perfil</Link></li>
            </>
        );
    } else if (usuario?.role === roles.paciente) {
        return (
            <>
                <p>{usuario?.role}</p>
                <li className="d-block d-md-none"><Link to={routes.home}>Inicio</Link></li>
                <li><Link to={routes.resultado()}>Mis Resultados</Link></li>
                <li><Link to={routes.manual.paciente}>Manual del paciente</Link></li>
                <li><Link to={routes.perfil}>Perfil</Link></li>
            </>
        );
    } else if (usuario?.role === roles.admin) {
        return (
            <>
                <p>{usuario?.role}</p>
                <li className="d-block d-md-none"><Link to={routes.home}>Inicio</Link></li>
                <li>
                    <a href="#Exam" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Exámenes</a>
                    <ul className="collapse list-unstyled" id="Exam">
                        <li><Link to={routes.agendar}>Agendar Prueba</Link></li>
                        <li><Link to={routes.agendado}>Ver Pruebas</Link></li>
                    </ul>
                </li>
                <li>
                    <a href="#Admin" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Usuarios</a>
                    <ul className="collapse list-unstyled" id="Admin">
                        <li><Link to={routes.agregarUsuarios}>Agregar Usuario</Link></li>
                        <li><Link to={routes.listaUsuarios}>Lista de Usuarios</Link></li>
                    </ul>
                </li>
                <li><Link to={routes.estadisticas}>Estadísticas</Link></li>
                <li><Link to={routes.manual.admin}>Manual del administrador</Link></li>
                <li><Link to={routes.perfil}>Perfil</Link></li>
            </>
        );
    } else {
        return (
            <>
                <p>Bienvenido</p>
                <li className="d-block d-md-none"><Link to={routes.home}>Inicio</Link></li>
            </>
        );
    }
}

export default NavBarRenderRoles;