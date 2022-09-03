import React, { useEffect, useState } from 'react'
import ExamenesRender from '../../helpers/ExamenesReder';
import useGetPacientes from '../../hooks/useGetPaciente';

const PruebasOrdenadas = () => {
    //Obtenemos Lista de Usuarios de la DB
    const estado = 'Ordenado';
    const [option, setOption] = useState("Más recientes");
    const dataEstado = { 'estado': estado, 'sorted': option }
    const [listaAgendado, dataUsers] = useGetPacientes(dataEstado);
    
    useEffect(() => {
        dataUsers();
        // eslint-disable-next-line
    },[option])

    return (
        <ExamenesRender
            infoList={listaAgendado}
            dataUsers={dataUsers}
            estado={estado}
            setOption={setOption}
        />
    );
}

export default PruebasOrdenadas;