import React from 'react';
import { Helmet } from 'react-helmet';
import Fondo from '../elements/Fondo';
import { ContenedorMayor, MostrarText } from '../elements/Formularios';
import { useParams } from 'react-router-dom';
import useGetUsuario from '../hooks/useGetUsuario';
import ResultSelect from '../elements/SelectorResultado';
import GraficoResultado from '../images/GraficoResultado.png';
import styled from 'styled-components';
import { ReactComponent as T21Logo } from './../images/T21Logo.svg';
import { ReactComponent as T18Logo } from './../images/T18Logo.svg';
import { ReactComponent as T13Logo } from './../images/T13Logo.svg';
import theme from '../theme';
import useGetResultado from '../hooks/resultados/useGetResultado';


const Resultados = () => {
    const { id } = useParams();
    const [resultado] = useGetResultado({ id });
    const [usuario] = useGetUsuario({ id });

    return (
        <>
            <Helmet><title>Resultados</title></Helmet>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-10 mx-auto my-auto">
                        <h1 className="h2 mb-4 text-center text-primary" style={{ "fontWeight": "700" }}>Resultados</h1>
                        <div className="col-12 justify-content-between mb-3 d-flex" >
                            <label className="mb-1 my-auto" style={{ "fontWeight": "500" }}>Paciente: {usuario?.name + ' ' + usuario?.lastnameA + ' ' + usuario?.lastnameB} </label>
                            <label className="mb-1 my-auto" style={{ "fontWeight": "500" }}>{usuario?.personalIDtype + ' ' + usuario?.personalID} </label>
                            <label className="mb-1 my-auto" style={{ "fontWeight": "500" }}>{'Porcentaje de ADN libre fetal: ' + resultado?.porcentajeADN + ' %'}</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-11 mx-auto my-auto">
                        <ContenedorMayor lista>
                            <table className="table text-primary d-none d-lg-table text-center">
                                <tbody>
                                    <tr>
                                        <th scope="col">Cromosoma</th>
                                        <th scope="col">Resultado</th>
                                        <th scope="col">Probabilidad</th>
                                        <th scope="col">Recomendación</th>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="input-group mb-2 d-flex text-center">
                                <MostrarText className="flex-fill" style={{ "width": "6rem" }}>Trisomia 21(T21)</MostrarText>
                                <MostrarText className="flex-fill" style={{ "width": "5rem" }}>
                                    {resultado?.T21 === 'Menor 1/10,000 (0.01%)'
                                        ? "Riesgo Bajo"
                                        : (resultado?.T21 <= 2 ? "Riesgo Bajo" : "Riesgo Alto")
                                    }
                                </MostrarText>
                                <ResultSelect value={resultado?.T21} />
                                <MostrarText className="flex-fill" style={{ "width": "8rem" }}>{resultado?.recoT21}</MostrarText>
                            </div>
                            <div className="input-group mb-2 d-flex text-center">
                                <MostrarText className="flex-fill" style={{ "width": "6rem" }}>Trisomia 18(T18)</MostrarText>
                                <MostrarText className="flex-fill" style={{ "width": "5rem" }}>
                                    {resultado?.T18 === 'Menor 1/10,000 (0.01%)'
                                        ? "Riesgo Bajo"
                                        : (resultado?.T18 <= 2 ? "Riesgo Bajo" : "Riesgo Alto")
                                    }
                                </MostrarText>
                                <ResultSelect value={resultado?.T18} />
                                <MostrarText className="flex-fill" style={{ "width": "8rem" }}>{resultado?.recoT18}</MostrarText>
                            </div>
                            <div className="input-group mb-2 d-flex text-center">
                                <MostrarText className="flex-fill" style={{ "width": "6rem" }}>Trisomia 13(T13)</MostrarText>
                                <MostrarText className="flex-fill" style={{ "width": "5rem" }}>
                                    {resultado?.T13 === 'Menor 1/10,000 (0.01%)'
                                        ? "Riesgo Bajo"
                                        : (resultado?.T13 <= 2 ? "Riesgo Bajo" : "Riesgo Alto")
                                    }
                                </MostrarText>
                                <ResultSelect value={resultado?.T13} />
                                <MostrarText className="flex-fill" style={{ "width": "8rem" }}>{resultado?.recoT13}</MostrarText>
                            </div>
                            <div className="input-group mb-2 d-flex text-center">
                                <MostrarText className="flex-fill" style={{ "width": "6rem" }}>Sexo Fetal</MostrarText>
                                <MostrarText className="flex-fill" style={{ "width": "5rem" }}>{resultado?.SexoFetal}</MostrarText>
                                <ResultSelect value={resultado?.valorSexoFetal} />
                                <MostrarText className="flex-fill" style={{ "width": "8rem" }}>{resultado?.recoSexoFetal}</MostrarText>
                            </div>
                            <div className="input-group mb-2 d-flex text-center">
                                <MostrarText className="flex-fill" style={{ "width": "6rem" }}>Análisis X,Y</MostrarText>
                                <MostrarText className="flex-fill" style={{ "width": "5rem" }}>{resultado?.Analisis}</MostrarText>
                                <ResultSelect value={resultado?.valorAnalisis} />
                                <MostrarText className="flex-fill" style={{ "width": "8rem" }}>{resultado?.recoAnalisis}</MostrarText>
                            </div>
                            {/* Grafico de Resultados */}
                            <div className="col-11 mt-4 mx-auto d-none d-lg-block">
                                <IconoContent>
                                    <IconoTrisomia21 select={resultado?.T21} />
                                </IconoContent>
                                <IconoContent>
                                    <IconoTrisomia18 select={resultado?.T18} />
                                </IconoContent>
                                <IconoContent>
                                    <IconoTrisomia13 select={resultado?.T13} />
                                </IconoContent>
                                <img src={GraficoResultado} style={{ "width": "100%" }} alt="Grafica" />
                            </div>
                            {/* Texto Inferior de explicación de la prueba */}
                            <div className="d-flex mt-4 pt-4" style={{ "borderTop": "2px solid", "width": "100%" }}>
                                <div className="col-6 pe-3 me-3" style={{ "borderRight": "2px solid", "height": "100%" }}>
                                    <h5 style={{ "fontSize": "1rem", "fontWeight": "700" }}>Descripción de la prueba</h5>
                                    <p style={{ "fontSize": "0.7rem", "fontWeight": "300" }}>Las pruebas de ADN Fetal en Sangre Materna miden la proporción relativa de cromosomas para ayudar a determinar el riesgo de trisomías fetales 21, 18 y 13. Las pruebas desarrolladas en laboratorios del departamento del Huila realizan un análisis dirigido de ADN libre en sangre materna e incorporan la fracción fetal de ADN libre en los resultados de las pruebas, Los resultados de las pruebas también incorporan el riesgo relacionado con la edad de la madre (o de la donante de óvulos) y con la edad gestacional en base a la información obtenida en el formulario de solicitud de la prueba. Las pruebas se han validado en embarazos únicos y de gemelos de al menos 10 semanas de edad gestacional. Las pruebas no están previstas, ni se han validado, para el diagnostico o el uso en casos de embarazos con mas de dos fetos, mosaicismo, aneuploidía cromosómica parcial, translocación o aneuploidía materna. EL análisis del ADN libre no siempre está en correlación con el genotipo fetal. No todos los fetos aneuploides se clasificarán de riesgo alto, y algunos fetos euploides tendrán un resultado de riesgo alto. Los resultados deben considerarse junto con otros criterios clínicos y comunicarse en una situación que incluya un asesoramiento apropiado.</p>
                                    <p style={{ "fontSize": "0.7rem", "fontWeight": "300" }}>El Análisis X,Y mide las proporciones de los cromosomas X e Y. Se obtiene información sobre el sexo fetal y el riesgo de condiciones cromosómicas sexuales (monosomía X, XXY, XYY, XXX, XXYY) cuando el riesgo sea igual o superior al 1%. El Análisis X, Y solo se ha validado en embarazos únicos.</p>
                                </div>
                                <div className="col-6 pe-3">
                                    <h5 style={{ "fontSize": "1rem", "fontWeight": "700" }}>Datos Clínicos</h5>
                                    <table className="table text-primary  text-center">
                                        <thead style={{ "fontSize": "0.7rem", "fontWeight": "500" }}>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Tasa de detección</th>
                                                <th scope="col">Falsos Positivos</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ "fontSize": "0.7rem", "fontWeight": "400" }}>
                                            <tr>
                                                <td>T21</td>
                                                <td>Mayor a 99% <br />(95% IC: 95 - 100% )</td>
                                                <td>Menor a 0.1% <br />(95% IC: 0.0 - 0.2% )</td>
                                            </tr>
                                            <tr>
                                                <td>T18</td>
                                                <td>Mayor a 98% <br />(95% IC: 93 - 100% )</td>
                                                <td>Menor a 0.1% <br />(95% IC: 0.0 - 0.3% )</td>
                                            </tr>
                                            <tr>
                                                <td>T13</td>
                                                <td>Mayor a 80% <br />(95% IC: 95 - 100% )</td>
                                                <td>Menor a 0.1% <br />(95% IC: 0.0 - 0.1% )</td>
                                            </tr>
                                            <tr>
                                                <td>Análisis X,Y</td>
                                                <td>Mayor a 99% <br />(95% IC: 99.2 - 100% )</td>
                                                <td>Menor a 0.1% <br />(95% IC: 0.0 - 0.1% )</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p style={{ "fontSize": "0.7rem", "fontWeight": "300" }}>Dada la singularidad de la Trisomía 13, la cantidad de casos analizados es limitada.</p>
                                    <p style={{ "fontSize": "0.7rem", "fontWeight": "300" }}>Las tasas de detección y falsos positivos se basan en un punto de corte de riesgo de 1/100 (1%) y en embarazos únicos no procedentes de donación de óvulos. El valor predictivo negativo para las trisomías 21, 18 y 13, es superior al 99%. El valor predictivo positivo varia según la prevalencia. </p>
                                </div>
                            </div>
                        </ContenedorMayor>
                    </div>
                </div>
            </div>
            <Fondo />
        </>
    );
}

export default Resultados;


//Styles para la grafica de resultados
const handleColorType = (select) => {
    switch (select) {
        case "Menor 1/10,000 (0.01%)":
            return "3%";
        case "1":
            return "18.3%";
        case "2":
            return "34%";
        case "3":
            return "49.5%";
        case "4":
            return "64.8%";
        case "5":
            return "80.1%";
        case "6":
            return "96%";
        default:
            return "3%";
    }
};

const IconoTrisomia21 = styled(T21Logo)`
    position: absolute;
    top: 50%;
    left: ${({ select }) => handleColorType(select)};;
    transform: translate(0,-50%);
    width: 18px;
    fill: ${theme.moradoOscuro};
    transition: .2s;
`;

const IconoTrisomia18 = styled(T18Logo)`
    position: absolute;
    top: 50%;
    left: ${({ select }) => handleColorType(select)};;
    transform: translate(0,-50%);
    width: 18px;
    fill: ${theme.moradoOscuro};
    transition: .2s;
`;

const IconoTrisomia13 = styled(T13Logo)`
    position: absolute;
    top: 50%;
    left: ${({ select }) => handleColorType(select)};;
    transform: translate(0,-50%);
    width: 18px;
    fill: ${theme.moradoOscuro};
    transition: .2s;
`;

const IconoContent = styled.div`
    position: relative;
    height: 27px;
`;
