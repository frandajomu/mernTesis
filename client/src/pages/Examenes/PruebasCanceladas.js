import React from 'react'
import ExamenesRender from '../../helpers/ExamenesReder';
import useGetPacientes from '../../hooks/useGetPaciente';

const PruebasCanceladas = () => {
    //Obtenemos Lista de Usuarios de la DB
    const estado = 'Cancelado';
    const dataEstado = { 'estado': estado }
    const [listaAgendado, dataUsers] = useGetPacientes(dataEstado);

    const recivedFromExamsRender = (options) => {
        console.log(options)
    }

    return (
        <ExamenesRender
            infoList={listaAgendado}
            dataUsers={dataUsers}
            estado={estado}
            recivedFromExamsRender={recivedFromExamsRender}
        />
    );
}

export default PruebasCanceladas;