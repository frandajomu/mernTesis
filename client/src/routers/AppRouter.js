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
import EditarUsuarioAdmin from "../pages/EditarUsuarioAdmin";
import Home from "../pages/Home";
import ListaDeUsuarios from '../pages/ListaDeUsuarios';
import Login from "../pages/Login";
import ManualAdministrador from '../pages/manuales/ManualAdministrador';
import ManualLaboratorio from '../pages/manuales/ManualLaboratorio';
import ManualMedico from '../pages/manuales/ManualMedico';
import ManualPaciente from '../pages/manuales/ManualPaciente';
import MiPerfil from '../pages/MiPerfil';
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from './PrivateRoutes';
import PublicRoute from './PublicRoute';
import AgendarCita from '../pages/AgendarCita';
import CreateAdminInicial from './CreateAdminInicial';
import ConfigTurnos from '../pages/admin/ConfigTurnos';
import PruebasOrdenadas from '../pages/Examenes/PruebasOrdenadas';
import PruebasAgendadas from '../pages/Examenes/PruebasAgendadas';
import PruebasRealizadas from '../pages/Examenes/PruebasRealizadas';
import PruebasResultados from '../pages/Examenes/PruebasResultados';
import PruebasCanceladas from '../pages/Examenes/PruebasCanceladas';
import Resultados from '../pages/Resultados';
import ResetPassword from '../pages/ResetPassword';

const AppRouter = () => {
    return (
        <Routes>
            {/* Ingreso Para todo Público */}
            <Route exact path={routes.home} element={<Home />} />
            <Route exact path={routes.conoceMas} element={<ConoceMas />} />
            <Route exact path={routes.login} element={<PublicRoute><Login /></PublicRoute>} />
            <Route exact path={routes.resetPassword()} element={<PublicRoute><ResetPassword /></PublicRoute>} />

            {/* Médico y Laboratorio */}
            <Route exact path={routes.pruebasOrdenadas} element={<PrivateRoute><PruebasOrdenadas /></PrivateRoute>} />
            <Route exact path={routes.resultados} element={<PrivateRoute><PruebasResultados /></PrivateRoute>} />
            <Route exact path={routes.estadisticas} element={<PrivateRoute><Estadisticas /></PrivateRoute>} />
            <Route exact path={routes.perfil} element={<PrivateRoute><MiPerfil /></PrivateRoute>} />
            <Route exact path={routes.resultado()} element={<PrivateRoute><Resultados /></PrivateRoute>} />

            {/* Médico */}
            <Route exact path={routes.agendar} element={<PrivateRoute role={roles.medico}><AgendarPrueba /></PrivateRoute>} />
            <Route exact path={routes.editarAgenda()} element={<PrivateRoute role={roles.medico} role2={roles.admin}><EditarAgenda /></PrivateRoute>} />
            <Route exact path={routes.manual.medico} element={<PrivateRoute role={roles.medico}><ManualMedico /></PrivateRoute>} />

            {/* Paciente */}
            <Route exact path={routes.manual.paciente} element={<PrivateRoute role={roles.paciente}><ManualPaciente /></PrivateRoute>} />

            {/* Laboratorio */}
            <Route exact path={routes.cargarResultado()} element={<PrivateRoute role={roles.laboratorio}><CargarResultado /></PrivateRoute>} />
            <Route exact path={routes.editarResultado()} element={<PrivateRoute role={roles.laboratorio}><EditarResultado /></PrivateRoute>} />
            <Route exact path={routes.manual.laboratorio} element={<PrivateRoute role={roles.laboratorio}><ManualLaboratorio /></PrivateRoute>} />
            <Route exact path={routes.agendarCita()} element={<PrivateRoute role={roles.laboratorio}><AgendarCita /></PrivateRoute>} />
            <Route exact path={routes.pruebasAgendadas} element={<PrivateRoute role={roles.laboratorio} role2={roles.admin}><PruebasAgendadas /></PrivateRoute>} />
            <Route exact path={routes.pruebasRealizadas} element={<PrivateRoute role={roles.laboratorio} role2={roles.admin}><PruebasRealizadas /></PrivateRoute>} />
            <Route exact path={routes.pruebasCanceladas} element={<PrivateRoute role={roles.laboratorio} role2={roles.admin}><PruebasCanceladas /></PrivateRoute>} />
            
            {/* Registro Admin */}
            <Route exact path={routes.registro} element={<CreateAdminInicial><RegistroAdmin /></CreateAdminInicial>} />
            <Route exact path={routes.configInicial} element={<PrivateRoute role={roles.admin}><ConfigTurnos /></PrivateRoute>} />
            <Route exact path={routes.manual.admin} element={<PrivateRoute role={roles.admin}><ManualAdministrador /></PrivateRoute>} />
            <Route exact path={routes.agregarUsuarios} element={<PrivateRoute role={roles.admin}><AgregarUsuarioAdmin /></PrivateRoute>} />
            <Route exact path={routes.listaUsuarios} element={<PrivateRoute role={roles.admin}><ListaDeUsuarios /></PrivateRoute>} />
            <Route exact path={routes.editarUsuario()} element={<PrivateRoute role={roles.admin}><EditarUsuarioAdmin /></PrivateRoute>} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRouter;