import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import roles from '../../helpers/Roles';
import Inicio from '../../images/Manuales/Inicio.png';
import Login from '../../images/Manuales/Login.png';
import ForgetPass from '../../images/Manuales/ForgetPass.png';
import OrdenarPrueba from '../../images/Manuales/OrdenarPrueba.png';
import OrMedico from '../../images/Manuales/OrMedico.png';
import OrLab from '../../images/Manuales/OrLab.png';
import AgeCita from '../../images/Manuales/AgeCita.png';
import AgenLab from '../../images/Manuales/AgenLab.png';
import RealizaLab from '../../images/Manuales/RealizaLab.png';
import CargaResult from '../../images/Manuales/CargaResult.png';
import CanceLab from '../../images/Manuales/CanceLab.png';
import ResultMedic from '../../images/Manuales/ResultMedic.png';
import ResultLab from '../../images/Manuales/ResultLab.png';
import AdminInicial from '../../images/Manuales/AdminInicial.png';
import UserRegister from '../../images/Manuales/UserRegister.png';
import UserList from '../../images/Manuales/UserList.png';
import UserEdit from '../../images/Manuales/UserEdit.png';
import ConfigDates from '../../images/Manuales/ConfigDates.png';
import AdminExam from '../../images/Manuales/AdminExam.png';
import MisResults from '../../images/Manuales/MisResults.png';
import ResultPaciente from '../../images/Manuales/ResultPaciente.png';
import Perfil from '../../images/Manuales/Perfil.png';
import Ayuda from '../../images/Manuales/Ayuda.png';

const Manual = ({ user }) => {
    return (
        <Container>
            <MenuGeneral className="sticky-sm-top flex-shrink-0 p-3 bg-white d-none d-sm-block" style={{ "width": "260px" }}>
                <div className="d-flex align-itemsLinksDcenter pb-3 mb-3 text-decoration-none border-bottom">
                    <h1 className="fs-5 " style={{ "color": theme.moradoOscuro }}>Documentación</h1>
                </div>
                <ul className="list-unstyled ps-0" style={{ "fontSize": "1.15rem" }}>
                    <li className="mb-1">
                        <BotonToggle className="btn align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">Introducción</BotonToggle>
                        <div className="collapse" id="home-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><LinksD href="#Welcome" className="link-dark rounded">Bienvenido</LinksD></li>
                                <li><LinksD href="#GetStart" className="link-dark rounded">Comenzando</LinksD></li>
                                <li><LinksD href="#LogIn" className="link-dark rounded">¿Cómo ingresar?</LinksD></li>
                                <li><LinksD href="#Forget" className="link-dark rounded">Recuperar Clave</LinksD></li>
                            </ul>
                        </div>
                    </li>
                    <li className="border-top my-3"></li>
                    {user.role !== roles.paciente ?
                        user.role !== roles.admin ?
                            <li className="mb-1">
                                <BotonToggle className="btn align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#exam-collapse" aria-expanded="false">Exámenes</BotonToggle>
                                <div className="collapse" id="exam-collapse">
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        {user.role === roles.medico &&
                                            <li><LinksD href="#OrdPrueba" className="link-dark rounded">Ordenar Prueba</LinksD></li>
                                        }
                                        <li><LinksD href="#PruebaOrd" className="link-dark rounded">Pruebas Ordenadas</LinksD></li>
                                        {user.role !== roles.medico &&
                                            <>
                                                <li><LinksD href="#PruebaAge" className="link-dark rounded">Pruebas Agendadas</LinksD></li>
                                                <li><LinksD href="#PruebaRea" className="link-dark rounded">Pruebas Realizadas</LinksD></li>
                                                <li><LinksD href="#PruebaCan" className="link-dark rounded">Pruebas Canceladas</LinksD></li>
                                            </>
                                        }
                                        <li><LinksD href="#Resultado" className="link-dark rounded">Resultados</LinksD></li>
                                    </ul>
                                </div>
                            </li>
                            :
                            <li className="mb-1">
                                <BotonToggle className="btn align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#AdminCollapse" aria-expanded="false">Administrador</BotonToggle>
                                <div className="collapse" id="AdminCollapse">
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><LinksD href="#AdminInicial" className="link-dark rounded">Admin Inicial</LinksD></li>
                                        <li><LinksD href="#UserRegister" className="link-dark rounded">Registro de Usuarios</LinksD></li>
                                        <li><LinksD href="#UserList" className="link-dark rounded">Lista de Usuarios</LinksD></li>
                                        <li><LinksD href="#UserEdit" className="link-dark rounded">Edición de Usuarios</LinksD></li>
                                        <li><LinksD href="#ConfigDates" className="link-dark rounded">Configuración de Citas</LinksD></li>
                                        <li><LinksD href="#AdminExam" className="link-dark rounded">Exámenes</LinksD></li>
                                    </ul>
                                </div>
                            </li>
                        :
                        <li className="mb-1">
                            <a href="#MisResults" style={{ 'textDecoration': 'none' }}>
                                <BotonToggle className="btn align-items-center rounded">Mis Resultados</BotonToggle>
                            </a>
                        </li>
                    }
                    <li className="border-top my-3"></li>
                    <li className="mb-1">
                        <BotonToggle className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">Cuenta</BotonToggle>
                        <div className="collapse" id="account-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><LinksD href="#Perfil" className="link-dark rounded">Perfil</LinksD></li>
                                <li><LinksD href="#Ayuda" className="link-dark rounded">Contacto & Ayuda</LinksD></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </MenuGeneral>
            <div className="container">
                <div className="row mt-4 ms-4" style={{ "color": theme.moradoOscuro }}>
                    <div className="col-12">
                        <h3 id='Welcome'>Bienvenido</h3>
                        <p>Hola, bienvenido a la plataforma ADN Fetal en Sangre Materna un aplicativo web que te permitirá agendar, generar, realizar y ver los resultados de una prueba de una forma más fácil y práctica.</p>

                        <h3 id='GetStart'>Comenzando</h3>
                        <p> Para ingresar al aplicativo web de ADN Fetal en Sangre Materna, se debe dirigir al siguiente enlace: <a href="https://adnfetaltest.com/">adnfetaltest.com</a>, se te redirigirá a la página de inicio de la plataforma.</p>
                        <Images src={Inicio} alt='Inicio' />

                        <h3 id='LogIn'>¿Cómo ingresar?</h3>
                        <p> Una vez estés en la página inicial de la plataforma, puedes dirigirte al botón de ingresar para desplegar el módulo de Login del sistema, aquí deberás iniciar con el correo y contraseña que diste en el momento que el Administrador o Medico te pidieron al realizar el registro.</p>
                        <Images src={Login} alt='Login' />

                        <h3 id='Forget'>Recuperar Clave</h3>
                        <p> Si no recuerdas la contraseña podrás recuperarla fácilmente, para esto dirígete a ingresar y presiona en ¿Olvidaste la contraseña?, cambiará el módulo de Login por el de Recuperar Contraseña, ingresa el correo con el que te encuentras registrado en la plataforma, al correo llegará un email con los pasos a seguir para restaurar la contraseña de ingreso.</p>
                        <Images src={ForgetPass} alt='ForgetPass' />
                        <p>Ten en cuenta que el enlace solo estará habilitado por 15 min por la seguridad de tu cuenta, si pasas esos 15 minutos deberás realizar todo el proceso de cambiar contraseña desde cero. Asimismo, si ya utilizaste el link que se te envió a tu correo, es decir si ya cambiaste exitosamente la contraseña y vuelves a olvidarla, dicho enlace ya no te servirá, y deberás realizar la actualización de tu clave nuevamente haciendo todo el proceso de recuperación.</p>
                    </div>
                    <div className="border-top my-3"></div>
                    {user.role !== roles.paciente ?
                        user.role !== roles.admin ?
                            <div className="col-12">
                                {user.role === roles.medico && 
                                    <>
                                        <h3 id='OrdPrueba'>Ordenar Prueba</h3>
                                        <p>Solo los medicos podrán ingresar al modulo de ordenar pruebas, en el apartado de exámenes encontrará el módulo, siga los distintos pasos del formulario, no deberá dejar ninguna casilla sin llenar puesto que el formulario no se enviará. </p>
                                        <Images src={OrdenarPrueba} alt='OrdPrueba' />
                                        <p>Tenga en cuenta que si la paciente a la cual va a ordenar una prueba ya posee una cuenta de usuario, debido a que quizás ya es su segunda o tercera prueba, el sistema le permitirá generar nuevas ordenes sin ningún problema, deberá ingresar los datos de la paciente cada vez que necesite una orden. Una vez realizado el registro de la prueba, se le redireccionará al módulo de Exámenes Ordenados</p>
                                    </>
                                }

                                <h3 id='PruebaOrd'>Pruebas Ordenadas</h3>
                                {user.role === roles.medico &&
                                    <>
                                        <p>El modulo sera una lista en donde podrá buscar el paciente según su nombre o cédula, dar orden al listado de pruebas entre más recientes y más antiguos. Además, denotará las pruebas ordenadas del paciente, como médico solo podrá ver la información detallada del paciente dando clic en el botón con el icono más.</p>
                                        <Images src={OrMedico} alt='OrMedico' />
                                    </>
                                }

                                {user.role === roles.laboratorio &&
                                    <>
                                        <p>A diferencia del rol de medico, como laboratorio deberá agendar la cita de la prueba ordenada. Una vez allá ingresado al módulo de clic en el icono de calendario al lado del nombre de la paciente. Se abrirá un cuadro de dialogo, donde podrá cerciorarse que todos los datos coinciden con la paciente a agendar, si está seguro de clic en Agendar Examen. </p>
                                        <Images src={OrLab} alt='OrLab' />
                                        <p> Se abrirá una nueva pestaña para agendar la prueba, dependiendo de la configuración inicial que el Administrador allá realizado se permitirá agendar un límite de exámenes por día (turnos diarios), así como también se le limitara el máximo de días que tendrá permitido agendar un examen. Al seleccionar un día en el calendario aparecerá la información relevante del día y turno dado para el paciente, presione en Agendar, y se abrirá el módulo de Pruebas Agendadas. </p>
                                        <Images src={AgeCita} alt='AgeCita' />

                                        <h3 id='PruebaAge'>Pruebas Agendadas</h3>
                                        <p>Se podrá pasar las pruebas al módulo de Pruebas realizadas una vez se halla cumplido con la cita de la prueba y se estén esperando los resultados, dando clic en el icono de check, o cancelar la prueba dando clic en el icono de la x. Igualmente podrá ver toda la información del usuario dando clic en el botón más.</p>
                                        <Images src={AgenLab} alt='AgenLab' />

                                        <h3 id='PruebaRea'>Pruebas Realizadas</h3>
                                        <p>En este modulo encontrará los exámenes que estarán en estado de espera de resultados. Tendrá la opción de cargar los resultados dando clic en el botón con el icono de upload. Verá una ventana flotante en donde deberá presionar el botón cargar resultados.</p>
                                        <Images src={RealizaLab} alt='RealizaLab' />
                                        <p>Diligencie el formulario para Cargar los Resultados, al terminar de clic a subir datos, se notificará en la pantalla el éxito del proceso y se abrirá el Módulo de Resultados.</p>
                                        <Images src={CargaResult} alt='CargaResult' />

                                        <h3 id='PruebaCan'>Pruebas Canceladas</h3>
                                        <p>Como Laboratorio podrá visualizar las citas que fueron canceladas, aquí se mostrara un registro en donde es posible ver los datos de las pacientes de forma más detallada al presionar en el botón de más, que se encuentra frente al nombre de cada usuario.</p>
                                        <Images src={CanceLab} alt='CanceLab' />
                                    </>
                                }

                                <h3 id='Resultado'>Resultados</h3>
                                {user.role === roles.medico &&
                                    <>
                                        <p>En el modulo de Resultados se mostrará un listado de pacientes que contendrán los resultados de los exámenes practicados, y como medico podrá ver a detalle el resultado de una prueba. </p>
                                        <Images src={ResultMedic} alt='ResultMedic' />
                                    </>
                                }
                                {user.role === roles.laboratorio &&
                                    <>
                                        <p>En el modulo de Resultados se mostrará un listado de pacientes que contendrán los resultados de los exámenes practicados, y como laboratorio podrá ver a detalle el resultado de una prueba, asimismo si lo desea tendrá la opción de editar los resultados de una prueba.</p>
                                        <Images src={ResultLab} alt='ResultLab' />
                                    </>
                                }
                            </div>
                            :
                            <div className="col-12">
                                <h3 id='AdminInicial'>Registro Administrador Inicial</h3>
                                <p>Se permite la creación inicial exclusiva de un solo Administrador, ingresando al siguiente enlace <a href="https://adnfetaltest.com/registroAdmin">adnfetaltest.com/registroAdmin</a>. Una vez se ingrese al enlace, se topará con un formulario inicial, en el cual se deberá ingresar los distintos datos y seguir los distintos pasos hasta culminar con el formulario. Si ha completado correctamente el formulario aparecerá una breve notificación en la parte superior y se le redireccionará al módulo de Login.
                                </p>
                                <Images src={AdminInicial} alt='AdminInicial' />
                                <p>Deberá tener extrema precaución con el correo y contraseña diligenciado como administrador, ya que, una vez creado el primer administrador, se bloqueará el acceso al link, y solo con el administrador inicial se podrá crear un nuevo usuario.</p>

                                <h3 id='UserRegister'>Registro de Usuarios</h3>
                                <p>Solo los usuarios Administradores tendrán permitido crear usuario distintos al rol de paciente, no existe ningún otro medio posible para registrarse en la plataforma. Realizado el login, diríjase al apartado de Admin y de clic en Agregar usuario. </p>
                                <Images src={UserRegister} alt='UserRegister' />
                                <p>Se debe diligenciar todos los datos, correo y contraseña de la cuenta, además de asignarle un rol al usuario nuevo. Si se completa correctamente el formulario de registro se redireccionará al módulo de Lista de Usuarios. </p>

                                <h3 id='UserList'>Lista de Usuarios</h3>
                                <p>Podrás ver, editar o eliminar los datos de un usuario, para realizar esto, diríjase a Admin e ingrese a Lista de usuarios.</p>
                                <Images src={UserList} alt='UserList' />
                                <p>Si desea eliminar un usuario use el icono de x a un lado del usuario, se desplegará una advertencia. Si está seguro de su acción presione aceptar, una vez eliminado el usuario desaparecerá de la Lista de Usuarios. Tenga especial cuidado al eliminar un usuario ya que no se podrá recuperar ningún tipo de dato de la cuenta eliminada.
                                </p>
                                <p>Por el contrario, si se quiere editar la información de un usuario, presione el icono de lápiz, se abrirá una ventana en donde podrá previsualizar los datos del usuario. Para editar los valores de clic en el botón Editar Datos, una vez presionado el botón se abrirá el módulo de Edición de Usuarios.
                                </p>

                                <h3 id='UserEdit'>Edición de Usuarios</h3>
                                <p>Al tratar de editar un usuario, usted vera un formulario, el cual contendrá los datos actuales del usuario a quien se le pretende realizar la edición, al tratarse de un aplicativo de salud, por motivos de seguridad será obligatorio realizar un cambio de contraseña de la cuenta a editar.</p>
                                <Images src={UserEdit} alt='UserEdit' />

                                <h3 id='ConfigDates'>Configuración de Citas</h3>
                                <p>En el aplicativo web tendrá la opción de configurar cuantas citas diarias serán permitidas las cuales serán contadas como turnos, y el máximo de días en los que los pacientes podrán reservar una cita. Para lo anterior, diríjase al menú de Admin y de clic en configuración, se mostrará una pestaña igual.</p>
                                <Images src={ConfigDates} alt='ConfigDates' />

                                <h3 id='AdminExam'>Exámenes</h3>
                                <p>En el módulo de exámenes tendrá acceso a cinco submódulos (Pruebas ordenadas, agendadas, realizadas, canceladas y resultados) en los cuales como Administrador podrá ver y editar los datos de los pacientes, el funcionamiento es similar al apartado de Lista de Usuarios </p>
                                <Images src={AdminExam} alt='AdminExam' />

                            </div>
                        :
                        <div className="col-12">
                            <h3 id='MisResults'>Mis Resultados</h3>
                            <p>Al ingresar a Mis Resultados se mostrará una lista con su o sus resultados según sea su caso. Al dar clic en el icono más se abrirá una ventana flotante en donde podrá ver sus datos personales, diferenciará fácilmente entre la lista de resultados por medio de la Fecha de la cita, esto le permitirá conocer cuál es la prueba más reciente si presenta alguna duda. Ya que las pruebas se ordenarán según la asignación dada en el botón de ordenar por más reciente o antiguo.</p>
                            <Images src={MisResults} alt='MisResults' />
                            <p>Al dar clic en Ver Resultado, se abrirá una nueva pestaña, en donde se mostraran cada uno de los resultados pertinentes, lea cuidadosamente. Si presenta alguna duda o pregunta contáctese con su médico.</p>
                            <Images src={ResultPaciente} alt='ResultPaciente' />
                        </div>
                    }

                    <div className="border-top my-3"></div>
                    <div className="col-12">
                        <h3 id='Perfil'>Perfil</h3>
                        {user.role !== roles.paciente ?
                            <>
                                <p>Podrá ver y editar los datos propios de su cuenta, así mismo podrá actualizar su contraseña si así lo desea. Para ubicarse en el módulo de Perfil, diríjase al menú lateral y de clic en Perfil</p>
                                <Images src={Perfil} alt='Perfil' />
                                <p>En la parte final de la pestaña Perfil encontrara las opciones de Editar Cuenta y Cambiar Contraseña, en cada una de las acciones permitidas se abrirá una pestaña superpuesta en donde podrá editar o cambiar sus datos según las acciones que se indiquen en la pestaña, se le notificara al guardar o al realizar cualquier cambio.
                                </p>
                            </>
                            :
                            <>
                                <p>Como paciente podrás cambiar la contraseña con la que ingresas al sistema, con la posibilidad de ver tus datos personales. Para esto dirígete al módulo de Perfil, allí podrás visualizar los datos y en la parte inferior de la pestaña encontrarás un botón para cambiar la contraseña.</p>
                                <Images src={Perfil} alt='Perfil' />
                                <p>Si quieres cambiar tu contraseña presiona el botón Cambiar contraseña, se abrirá una ventana flotante, en donde deberás ingresar tu contraseña actual, y una contraseña nueva con la cual ingresará de ahora en adelante. Si cumple todos los pasos exitosamente se mostrará un mensaje de éxito en la parte superior.</p>
                            </>
                        }

                        <h3 id='Ayuda'>Contacto & Ayuda</h3>
                        <p>Como usuario podrá generar una petición, queja o reclamo, que se notificará al correo de la plataforma, allí se le hará seguimiento por parte del Administrador. Para esto diríjase al modulo Conoce más, dentro de este podrá ver la pestaña de Contacto & Ayuda, vera un formulario sencillo. Si realiza la acción correctamente se le notificará que se envió el mensaje correctamente.</p>
                        <Images src={Ayuda} alt='Ayuda' />
                    </div>

                </div>
            </div>
        </Container>

    );
}

export default Manual;


const Container = styled.div`
        display: flex;
        flex-wrap: nowrap;
        height: 100vh;
        height: -webkit-fill-available;
        max-height: 100vh;
        overflow-x: auto;
        overflow-y: scroll;
`;

const MenuGeneral = styled.div`
    box-shadow: rgba(0, 0, 0, 0.30) 0px 0px 10px 0px;
`;

const Images = styled.img`
    width: 80%;
    display: block;
    margin: 0 auto 0 auto;
`;

const BotonToggle = styled.button`
    display: inline-flex;
    align-items: center;
    padding: .25rem .5rem;
    font-weight: 400;
    color: ${theme.moradoClaro};
    background-color: transparent;
    border: 0;

    &:focus {
        color: ${theme.moradoOscuro};
        font-weight: 500;
    }
`;


const LinksD = styled.a`
    display: inline-flex;
    padding: .1875rem .5rem;
    margin-top: .125rem;
    margin-left: 1.25rem;
    text-decoration: none;
    background-color: transparent;
    color: ${theme.moradoClaro};
  
    &:focus {
        color: ${theme.moradoOscuro};
        text-decoration: underline;
        font-weight: 500;
`;