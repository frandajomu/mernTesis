import React from 'react';
import Img1 from '../images/ImagesHome/Img1.jpg';
import styled from 'styled-components';
import { ReactComponent as LogoADN } from './../images/LogoADN.svg';

//<img src={Img1} width="40%"/>
const Home = () => {
    return (
        <div className="container-flex">
            <div className="row">
                {/*Imagén con Parallax*/}
                <BannerImg className="col">
                    <div className="col-10 col-md-5 ms-md-5 ps-md-5 ms-3 ps-3 text-light py-5 my-5 py-sm-5 my-sm-5 ">
                        <h1 className="h1-sm h5"> Test de ADN fetal en sangre materna</h1>
                        <p className="my-3 d-none d-sm-block">Es una prueba medica que analiza el ADN fetal para descartar anomalías genéticas en el bebé.</p>
                        <button type="button" className="btn btn-outline-light">Ver más</button>
                    </div>
                </BannerImg>

                {/*Tarjetas Caracteristicas*/}
                <section class="d-none d-sm-block">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-md-3 py-3">
                                <div class="card border-primary text-primary">
                                    <div class="card-body text-center">
                                        <h4 class="card-title">Card title 1</h4>
                                        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
                                            repellat aliquam?</p>
                                        <a href="#" class="card-link">Ver más</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card bg-primary text-light">
                                    <div class="card-body text-center">
                                        <h4 class="card-title">Card title 2</h4>
                                        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, esse
                                            mollitia?</p>
                                        <a href="#" class="card-link link-light">Ver más</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 py-3">
                                <div class="card border-primary text-primary">
                                    <div class="card-body text-center">
                                        <h4 class="card-title">Card title 3</h4>
                                        <p class="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas, ea
                                            accusantium!</p>
                                        <a href="#" class="card-link">Ver más</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card bg-primary text-light">
                                    <div class="card-body text-center">
                                        <h4 class="card-title">Card title 4</h4>
                                        <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae,
                                            architecto! Neces!</p>
                                        <a href="#" class="card-link link-light">Ver más</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Linea de comentario*/}
                <section class="Comentario mt-3 py-3 bg-light">
                    <div class="container" id="home">
                        <div class="row align-items-start">
                            <div class="col my-auto">
                                <div class="text-center">
                                    <h3>Lorem, ipsum dolor.</h3>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum commodi repellat eaque
                                        consectetur sequi culpa, aut hic error debitis quidem, veniam, architecto magnam esse
                                        recusandae.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Preguntas Frecuentes*/}
                <section>
                    <div class="container text-center py-4">
                        <h2>Preguntas Frecuentes</h2>
                        <div class="accordion accordion-flush" id="accordionFlushExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Accordion Item #1
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to
                                        demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion
                                        body.</div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        Accordion Item #2
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to
                                        demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion
                                        body. Let's imagine this being filled with some actual content.</div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseThree" aria-expanded="false"
                                        aria-controls="flush-collapseThree">
                                        Accordion Item #3
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" class="accordion-collapse collapse"
                                    aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Placeholder content for this accordion, which is intended to
                                        demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion
                                        body. Nothing more exciting happening here in terms of content, but just filling up the
                                        space to make it look, at least at first glance, a bit more representative of how this would
                                        look in a real-world application.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contacto */}
                <section id="Contact">
                    <div class="container">
                        <div class="row d-flex h-100">
                            <div class="col-sm-7">
                                <form class="py-4">
                                    <div class="input-group mb-3">
                                        <div class="input-group-text" id="basic-addon1">
                                            <i class="fas fa-user input-group-text IconsT"></i>
                                        </div>
                                        <input type="name" class="form-control" placeholder="Nombre" />
                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-text" id="basic-addon1">
                                            <i class="fas fa-envelope-open-text input-group-text IconsT"></i>
                                        </div>
                                        <input type="email" class="form-control" id="exampleFormControlInput1"
                                            placeholder="name@example.com" />
                                    </div>
                                    <div class="input-group mb-3">
                                        <div class="input-group-text" id="basic-addon1">
                                            <i class="fas fa-pencil-alt input-group-text IconsT"></i>
                                        </div>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                            placeholder="Mensaje"></textarea>
                                    </div>
                                    <div class="d-grid gap-2">
                                        <button type="submit" class="btn btn-primary">Enviar</button>
                                    </div>
                                </form>
                            </div>
                            <div class="col-sm-5 my-auto">
                                <LogoADN class="img-fluid mx-auto d-none d-sm-block" alt="LogoFin" style={{"width": "40%;", "fill": "blue" }}/>
                                
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default Home;

const BannerImg = styled.div`
    background: url(${Img1});
    background-size: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 20rem;
    display: flex;
    align-items: center;
    text-align: left;
`;