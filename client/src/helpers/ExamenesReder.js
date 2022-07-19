import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Fondo from '../elements/Fondo';
import { ContenedorMayor, SelectorA } from '../elements/Formularios';
import DeleteUsuario from '../components/DeleteUsuario';
import theme from '../theme';
import SearchBar from './../components/SearchBar'
import MostrarDatosUser from '../components/MostrarDatosUser';
import useModal from '../hooks/useModal';
import BotonesExamenesRender from './BotonesExamenesRender';
import WarningCheckRealizado from '../components/WarningCheckRealizado';
import WarningCancelAgenda from '../components/WarningCancelAgenda';

const ExamenesRender = ({ infoList, dataUsers, estado, recivedFromExamsRender }) => {

    //ID al dar click en eliminar un usuario para DeleteUsuario y EditModal
    const [idUsuario, setIDUser] = useState();
    const [idCita, setIDCita] = useState();

    //Logica Renderización de Formulario
    const [option, setOption] = useState("Más recientes");
    //Pasamos info al Parent a través de receivedFromExamsRender
    useEffect(() => {
        recivedFromExamsRender(option)
    }, [recivedFromExamsRender, option])

    //Usamos hook modal para mostrar datos del usuario
    const [isDatosEdit, datosEditAbierto, datosEditCerrado] = useModal();
    const handleClick = (id) => {
        setIDUser(id);
        datosEditAbierto();
    }

    return (
        <>
            <Helmet><title>{estado !== 'Resultado' ? 'Exámenes ' + estado + 's' : 'Resultados'}</title></Helmet>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-8 mx-auto my-auto">
                        <h1 className="h2 mb-4 text-center text-primary" style={{ "fontWeight": "700" }}>{estado !== 'Resultado' ? 'Exámenes ' + estado + 's' : 'Resultados'}</h1>
                        <div className="col-12 justify-content-between mb-3 d-flex" >
                            <SearchBar />
                            <div className="d-none d-lg-flex">
                                <label className="mb-1 my-auto" style={{ "fontWeight": "500" }}>Ordenar: </label>
                                <SelectorA exam className="ms-3 mt-2 mt-md-0" onChange={(e) => {
                                    const selectorOption = e.target.value;
                                    setOption(selectorOption);
                                }}>
                                    <option defaultValue>Más recientes</option>
                                    <option value='Más Antiguos'>Más antiguos</option>
                                </SelectorA>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-8 mx-auto my-auto">
                        <ContenedorMayor lista>
                            <table className="table text-primary">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Gestación</th>
                                        <th scope="col" className="d-none d-lg-block">Identificación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {estado === 'Ordenado' ?
                                        infoList.map((lista, index) => {
                                            return (
                                                <tr key={index} >
                                                    <td>{lista.name + ' ' + lista.lastnameA + ' ' + lista.lastnameB}</td>
                                                    <td>{lista.embarazo}</td>
                                                    <td className="d-none d-lg-block">{lista.personalID}</td>
                                                    <BotonesExamenesRender
                                                        lista={lista}
                                                        estado={estado}
                                                        handleClick={handleClick}
                                                        setIDUser={setIDUser}
                                                    />
                                                </tr>
                                            );
                                        })
                                        :
                                        infoList.map((lista, index) => {
                                            return (
                                                <tr key={index} >
                                                    <td>{lista.idUser.name + ' ' + lista.idUser.lastnameA + ' ' + lista.idUser.lastnameB}</td>
                                                    <td>{lista.idUser.embarazo}</td>
                                                    <td className="d-none d-lg-block">{lista.idUser.personalID}</td>
                                                    <BotonesExamenesRender
                                                        lista={lista}
                                                        estado={estado}
                                                        handleClick={handleClick}
                                                        setIDUser={setIDUser}
                                                        setIDCita={setIDCita}
                                                    />
                                                </tr>
                                            );
                                        })
                                    }

                                </tbody>
                            </table>
                            {/*
                            <div className="mx-auto col-12 text-center">
                                <BotonEditar>Cargar Más</BotonEditar>
                            </div>
                            */}

                            {infoList.length === 0 &&
                                <div className="mx-auto col-md-8 text-center" style={{ "color": theme.grisClaro2 }}>
                                    {estado === 'Ordenado' &&
                                        <h3>No hay exámenes ordenados</h3>
                                    }
                                    {estado === 'Agendado' &&
                                        <h3>No hay exámenes agendados</h3>
                                    }
                                    {estado === 'Realizado' &&
                                        <h3>No hay exámenes realizados</h3>
                                    }
                                    {estado === 'Resultado' &&
                                        <h3>No hay resultados de exámenes</h3>
                                    }
                                    {estado === 'Cancelado' &&
                                        <h3>No hay exámenes cancelados</h3>
                                    }
                                </div>
                            }
                        </ContenedorMayor>
                    </div>
                </div>
            </div>
            <WarningCheckRealizado
                idCita={idCita}
                idUser={idUsuario} />
            <WarningCancelAgenda
                idUser={idUsuario}
                idCita={idCita} />
            <DeleteUsuario
                idUser={idUsuario}
                idCita={idCita}
                estado={estado}
                dataUsers={dataUsers} />
            <MostrarDatosUser
                idUser={idUsuario}
                isOpen={isDatosEdit}
                cerrado={datosEditCerrado}
                idCita={idCita} />
            <Fondo />
        </>
    );
}

export default ExamenesRender;

