import React from 'react';
import { Routes, Route } from "react-router-dom";
import roles from '../helpers/Roles';
import routes from '../helpers/Routes';
import RegistroAdmin from "../pages/admin/RegistroAdmin";
import AgendarPrueba from "../pages/AgendarPrueba";
import AgregarUsuarioAdmin from '../pages/AgregarUsuarioAdmin';
import CargarResultado from "../pages/CargarResultado";
import ConoceMas from '../pages/ConoceMas';
import EditarAgenda from "../pages/EditarAgenda";
import EditarResultado from "../pages/EditarResultado";
import Estadisticas from '../pages/Estadisticas';
import ExamenAgendado from "../pages/ExamenAgendado";
import ExamenRealizado from "../pages/ExamenRealizado";
import Home from "../pages/Home";
import ListaDeUsuarios from '../pages/ListaDeUsuarios';
import Login from "../pages/Login";
import ManualAdministrador from '../pages/ManualAdministrador';
import ManualLaboratorio from '../pages/ManualLaboratorio';
import ManualMedico from '../pages/ManualMedico';
import ManualPaciente from '../pages/ManualPaciente';
import MiPerfil from '../pages/MiPerfil';
import NotFoundPage from "../pages/NotFoundPage";
import Resultados from "../pages/Resultados";
import PrivateRoute from './PrivateRoutes';
import PublicRoute from './PublicRoute';

const AppRouter = () => {
    return (
        <Routes>
            {/* Ingreso Para todo Público */}
            <Route exact path={routes.home} element={<Home />} />
            <Route exact path={routes.conoceMas} element={<ConoceMas />} />
            <Route exact path={routes.login} element={<PublicRoute><Login /></PublicRoute>} />

            {/* Médico y Laboratorio */}
            <Route exact path={routes.ver.agendado} element={<PrivateRoute><ExamenAgendado /></PrivateRoute>} />
            <Route exact path={routes.ver.realizado} element={<PrivateRoute><ExamenRealizado /></PrivateRoute>} />
            <Route exact path={routes.estadisticas} element={<PrivateRoute><Estadisticas /></PrivateRoute>} />
            <Route exact path={routes.perfil} element={<PrivateRoute><MiPerfil /></PrivateRoute>} />

            {/* Médico */}
            <Route exact path={routes.agendar} element={<PrivateRoute role={roles.medico}><AgendarPrueba /></PrivateRoute>} />
            <Route exact path={routes.editarAgenda()} element={<PrivateRoute role={roles.medico}><EditarAgenda /></PrivateRoute>} />
            <Route exact path={routes.manual.medico} element={<PrivateRoute role={roles.medico}><ManualMedico /></PrivateRoute>} />

            {/* Paciente */}
            <Route exact path={routes.resultado()} element={<PrivateRoute><Resultados /></PrivateRoute>} />
            <Route exact path={routes.manual.paciente} element={<PrivateRoute role={roles.paciente}><ManualPaciente /></PrivateRoute>} />

            {/* Laboratorio */}
            <Route exact path={routes.cargarResultado} element={<PrivateRoute role={roles.laboratorio}><CargarResultado /></PrivateRoute>} />
            <Route exact path={routes.editarResultado()} element={<PrivateRoute role={roles.laboratorio}><EditarResultado /></PrivateRoute>} />
            <Route exact path={routes.manual.laboratorio} element={<PrivateRoute role={roles.laboratorio}><ManualLaboratorio /></PrivateRoute>} />

            {/* Registro Admin */}
            <Route exact path={routes.registro} element={<RegistroAdmin />} />
            <Route exact path={routes.manual.admin} element={<PrivateRoute role={roles.admin}><ManualAdministrador /></PrivateRoute>} />
            <Route exact path={routes.agregarUsuarios} element={<PrivateRoute role={roles.admin}><AgregarUsuarioAdmin /></PrivateRoute>} />
            <Route exact path={routes.listaUsuarios} element={<PrivateRoute role={roles.admin}><ListaDeUsuarios /></PrivateRoute>} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRouter;