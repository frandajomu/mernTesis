
const routes ={
    home: "/",
    agendado: "/pruebas",
    estadisticas: "/estadisticas",
    perfil: "/perfil",
    agendar: "/agendarPruebas",
    editarAgenda: (editarId) => (editarId ? `/editarAgenda/${editarId}` : "/editarAgenda/:id"),
    editarUsuario: (UsuarioId) => (UsuarioId ? `/editarUsuario/${UsuarioId}` : "/editarUsuario/:id"),
    manual: {
        admin: "/manual/admin",
        medico: "/manual/medico",
        laboratorio: "/manual/paciente",
        paciente: "/manual/laboratorio"
    },
    resultado: (resultadoId) => (resultadoId ? `/resultado/${resultadoId}` : "/resultado/:id"),
    cargarResultado: (cargarId) => (cargarId ? `/cargarResultado/${cargarId}` : "/cargarResultado/:id"),
    editarResultado: (editarId) => (editarId ? `/editarResultado/${editarId}` : "/editarResultado/:id"),
    registro: "/registroAdmin",
    login: "/login",
    listaUsuarios: "/listaUsuarios",
    agregarUsuarios: "/agregarUsuarios",
    conoceMas: "/conoceMas"
}

export default routes;