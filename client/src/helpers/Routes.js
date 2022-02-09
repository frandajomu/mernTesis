
const routes ={
    home: "/",
    ver: { 
        agendado: "/ver/agendado",
        realizado: "/ver/realizado"
    },
    estadisticas: "/estadisticas",
    perfil: "/perfil",
    agendar: "/agendarPruebas",
    editarAgenda: (editarId) => (editarId ? `/editarAgenda/${editarId}` : "/editarAgenda/:id"),
    manual: {
        admin: "/manual/medico",
        medico: "/manual/medico",
        laboratorio: "/manual/paciente",
        paciente: "/manual/laboratorio"
    },
    resultado: (resultadoId) => (resultadoId ? `/resultado/:${resultadoId}` : "/resultado/:id"),
    cargarResultado: "/cargarResultado",
    editarResultado: (editarId) => (editarId ? `/editarResultado/:${editarId}` : "/editarResultado/:id"),
    registro: "/registroAdmin",
    login: "/login",
    listaUsuarios: "/listaUsuarios",
    agregarUsuarios: "/agregarUsuarios",
    conoceMas: "/conoceMas"
}

export default routes;