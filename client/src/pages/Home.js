import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import Img1 from '../images/ImagesHome/Img1.jpg';
import { ReactComponent as UscoLogo } from './../images/UscoLogo.svg';
import { ReactComponent as GetiLogo } from './../images/GetiLogo.svg';
import { ReactComponent as CardsA } from './../images/ImagesHome/CardsA.svg';
import { ReactComponent as CardsB } from './../images/ImagesHome/CardsB.svg';
import { ReactComponent as CardsC } from './../images/ImagesHome/CardsC.svg';
import { ReactComponent as CardsD } from './../images/ImagesHome/CardsD.svg';
import { ReactComponent as LogoADNB } from './../images/LogoADNB.svg';

const Home = () => {
    return (
        <div className="container-flex" style={{ "color": theme.moradoOscuro }}>
            <div className="row">
                {/*Imagén con Parallax*/}
                <BannerImg className="col">
                    <div className="col-10 col-lg-4 ms-lg-5 ps-lg-5 ms-3 ps-3 text-light py-3 my-3 py-sm-4 my-sm-4">
                        <h1 className="h2"> Test de ADN fetal en sangre materna</h1>
                        <p className="my-3 d-none d-sm-block">Es una prueba medica que analiza el ADN fetal para descartar anomalías genéticas en el bebé.</p>
                        <a type="button" className="btn btn-outline-light" href="#VerMas" >Ver más</a>
                    </div>
                </BannerImg>

                {/*Tarjetas Caracteristicas*/}
                <section className="d-none d-sm-block">
                    <div className="container">
                        <div className="row align-items-center my-5 my-md-1 my-lg-5">
                            <div className="col-md-3 py-3 text-center">
                                <CardsStyle className="card py-3">
                                    <CardsA className="mx-auto" width="60%" alt="CardsA" />
                                    <div className="card-body">
                                        <h4>Preciso</h4>
                                        <p className="card-text">Alta tasa de detección.</p>
                                    </div>
                                </CardsStyle>
                            </div>
                            <div className="col-md-3 py-3 text-center">
                                <CardsStyle className="card py-3">
                                    <CardsB className="mx-auto" width="60%" alt="CardsB" />
                                    <div className="card-body">
                                        <h4>No Invasivo</h4>
                                        <p className="card-text">Simple extracción de sangre.</p>
                                    </div>
                                </CardsStyle>
                            </div>
                            <div className="col-md-3 py-3 text-center">
                                <CardsStyle className="card py-3">
                                    <CardsC className="mx-auto" width="50%" alt="CardsC" fill={theme.moradoOscuro}/>
                                    <div className="card-body">
                                        <h4>Pertinente</h4>
                                        <p className="card-text">Desde la décima semana de gestación.</p>
                                    </div>
                                </CardsStyle>
                            </div>
                            <div className="col-md-3 py-3 text-center">
                                <CardsStyle className="card py-3">
                                    <CardsD className="mx-auto" width="60%" alt="CardsD" fill={theme.naranjaClaro}/>
                                    <div className="card-body">
                                        <h4>Rápido</h4>
                                        <p className="card-text">Resultados listos en menos de 14 días.</p>
                                    </div>
                                </CardsStyle>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Linea de conoce más*/}
                <section id="VerMas" className="Comentario py-3 bg-light">
                    <div className="container" >
                        <div className="row align-items-start">
                            <div className="col my-3 my-md-4">
                                <div className="text-center">
                                    <h3>¿Como funciona la prueba?</h3>
                                    <p className="mt-3">Las pruebas de ADN Fetal se desarrollan mediante una muestra de sangre de la madre, y miden la proporción relativa de cromosomas para ayudar a determinar el riesgo de trisomías fetales 21, 18 y 13. Las pruebas desarrolladas en laboratorios del departamento del Huila realizan un análisis dirigido de ADN libre en sangre materna e incorporan la fracción fetal de ADN libre en los resultados de las pruebas. Los resultados de las pruebas también incorporan el riesgo relacionado con la edad de la madre y con la edad gestacional en base a la información obtenida en el formulario de solicitud de la prueba.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Preguntas Frecuentes*/}
                <section>
                    <div className="container text-center py-4">
                        <h2>Preguntas Frecuentes</h2>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        ¿Cuál es el beneficio de esta prueba?
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Uno de los grandes beneficios de esta prueba es el conocimiento de los resultados en un tiempo corto y con un alto índice de detección, brindando a la madre un estado de tranquilidad, ya que permite descartar de manera confiable la presencia de anomalías genéticas en el bebé sin necesidad de procedimientos quirúrgicos.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        ¿Cualquier embarazada puede hacerse esta prueba?
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                                    data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Sí, esta prueba puede ser realizada en cualquier embarazada para su tranquilidad durante esta etapa de su vida. Pero, se encuentra especialmente indicado cuando el embarazo se considera de alto riesgo. Lo cual puede yacer cuando la madre tiene mas de 35 años, así como también si se cuenta con anomalías genéticas en la familia o al descubrimiento de una ecografía que indica la presencia de una enfermedad genética en el niño.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseThree" aria-expanded="false"
                                        aria-controls="flush-collapseThree">
                                        ¿La prueba tiene algún riesgo para el bebé?
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className="accordion-collapse collapse"
                                    aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Esta prueba no supone ningún riesgo para el bebé ni para la madre, ya que el análisis se realiza sobre una simple muestra de sangre extraída del brazo de la madre mediante venopunción.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseFour" aria-expanded="false"
                                        aria-controls="flush-collapseFour">
                                        ¿Desde que semana es seguro realizar el test?
                                    </button>
                                </h2>
                                <div id="flush-collapseFour" className="accordion-collapse collapse"
                                    aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Los consensos y guías internacionales recomiendan iniciar este estudio a las 10 semanas de gestación, ya que a partir de esa semana el ADN fetal alcanza el 4% de las concentraciones plasmáticas maternas. Esto permite una identificación con gran confiabilidad. El examen de estas características durante las semanas inferiores a las recomendadas puede conllevar a la necesidad de una nueva recolección debido a la insuficiencia de ADN fetal o al aumento de la frecuencia de las discrepancias.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingFive">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseFive" aria-expanded="false"
                                        aria-controls="flush-collapseFive">
                                        ¿Los resultados son confiables?
                                    </button>
                                </h2>
                                <div id="flush-collapseFive" className="accordion-collapse collapse"
                                    aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Las pruebas de ADN fetal en sangre materna poseen una alta sensibilidad y especificidad. La sensibilidad de esta prueba es superior al 99,99 % para la mayoría de las anomalías examinadas. Esto significa que si el feto es anormal durante el embarazo, la prueba lo detectará con una precisión del 99,99 %. También significa que si la prueba no muestra nada anormal, podemos asumir con confianza que la anomalía no existe, lo que brinda tranquilidad a las mujeres embarazadas. Y por el contrario, si la prueba revela un problema, podemos asumir con seguridad que existe una anomalía presente en el bebé.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="mt-3 bg-light">
                    <div className="row d-flex h-100">
                        <div className="col-md-5 my-auto">
                            <LogoADNB fill={theme.naranjaClaro} className="img-fluid mx-auto d-none d-md-block" alt="LogoFin" style={{ "width": "60%" }} />
                        </div>
                        <TextosFooter className="col-md-4 py-4 ps-md-5 bg-primary text-light">
                            <h3>Conoce más</h3>
                            <p><a target="_blank" href="https://www.huila.gov.co/salud/" rel="noopener noreferrer">Secretaria de salud del huila</a></p>
                            <p><a target="_blank" href="https://www.huila.gov.co/" rel="noopener noreferrer">Gobernación del Huila</a></p>
                            <p><a target="_blank" href="https://www.minsalud.gov.co" rel="noopener noreferrer">Ministerio de salud</a></p>
                            <GetiLogo className="img-fluid pt-3 d-none d-md-block" alt="GetiLogo" style={{ "width": "73%" }} />
                        </TextosFooter>
                        <TextosFooter className="col-md-3 py-4 bg-primary text-light">
                            <h3>Contacto</h3>
                            <p>adnfetalmaterno@gmail.com</p>
                            <p>+57 315 255 79 85</p>
                            <p><a target="_blank" href="/contactAyuda" rel="noopener noreferrer">PQRS</a></p>
                            <UscoLogo className="img-fluid pt-3 d-none d-md-block" alt="LogoUSCO" style={{ "width": "75%" }} />
                        </TextosFooter>
                    </div>
                </footer>
            </div >
        </div >
    );
}

export default Home;

const BannerImg = styled.div`
    background: url(${Img1});
    background-size: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 30rem;
    display: flex;
    align-items: center;
    text-align: left;
    @media (max-width: 700px){
        background-attachment: inherit;
        height: 100%;
    }
`;

const CardsStyle = styled.div`
    height: 18rem;
    &:hover{
        transition: all 0.25s !important;
        box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2)
        -webkit-transform: scale(1.05) !important;
        -ms-transform: scale(1.05) !important;
        transform: scale(1.05) !important;
        z-index: 1 !important;
    }
`;

const TextosFooter = styled.div`
    a {
        color: white;
        text-decoration: none;
    }
    a:hover {
        color: ${theme.grisClaro};
        text-decoration: underline;
    }
    p {
        font-size:16px;
        font-weight: 300;
    }

    @media (max-width: 50rem) { /* 80px */
        text-align: center;
    }
`;