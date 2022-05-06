import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import theme from "../theme";

import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import { Calendar, utils } from "@amir04lm26/react-modern-calendar-date-picker";
import myCustomLocale from "../helpers/myCustomLocale";

import '../css/Calendar.css';
import { Helmet } from "react-helmet";
import Fondo from "../elements/Fondo";
import { BotonMorado } from "../elements/Botones";
import useCreateCita from "../hooks/citas/useCreateCita";
import { notError, notExito } from "../elements/notifyToasty";
import useGetTurno from "../hooks/citas/useGetTurno";
import { parseISO } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import useGetUsuarioByCedula from "../hooks/useGetUserByCedula";
import routes from "../helpers/Routes";

const AgendarCita = () => {

  //Recibiendo Cedula del usuario
  const { id } = useParams();
  const [usuario] = useGetUsuarioByCedula({ id });

  //Variables meses en String
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  //Dia actual
  const dateNow = utils().getToday();

  //Dia seleccionados
  const defaultValue = { year: dateNow.year, month: dateNow.month, day: dateNow.day };
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [gotTurn, setgotTurn] = useState(1);
  //Dias desabilitados con className y no
  const [desableDate, setdesableDate] = useState([]);
  const [desableDate2, setdesableDate2] = useState([]);


  //Función conocer al hacer clic sobre Dias desabilitados
  const handleDisabledSelect = disabledDay => {
    console.log('Estas tratando de seleccionar un dia no hábil', disabledDay);
  };

  //Conversión de fechas en JSON para la db, y devuelta a lo normal
  //console.log({ year: dateToUnix.getFullYear(), month: dateToUnix.getMonth() + 1, day: dateToUnix.getDate() });

  //Obtención de fechas no habiles para selección
  const [turnoInfo, turnoDeseable] = useGetTurno()

  const FechasNoHabiles = async () => {
    const res = await turnoDeseable()
    if (res.length !== 0) {
      let updatedList = res.map(dateDesable => {
        const fechaDes = parseISO(dateDesable.citadate);
        return {
          year: (fechaDes).getFullYear(),
          month: (fechaDes).getMonth() + 1,
          day: (fechaDes).getDate(),
          className: 'orangeDay'
        };
      });
      let updatedList2 = res.map(dateDesable2 => {
        const fechaDes2 = parseISO(dateDesable2.citadate);
        return {
          year: (fechaDes2).getFullYear(),
          month: (fechaDes2).getMonth() + 1,
          day: (fechaDes2).getDate()
        };
      });
      setdesableDate(updatedList);
      setdesableDate2(updatedList2);
    } else {
      return null;
    }
  }

  useEffect(() => {
    FechasNoHabiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Obtención de turno según fecha escogida
  const TurnoHandle = async (e) => {
    setSelectedDay(e)
    const dataCita = {
      citadate: new Date(e.year, e.month - 1, e.day)
    }
    const res = await turnoInfo(dataCita)
    if (res.length !== 0) {
      setgotTurn(res.length + 1)
    } else {
      setgotTurn(1)
    }
  }

  //Conexión base de datosEditCerrado
  const [CreateCita] = useCreateCita();
  const datedb = {
    citadate: new Date(selectedDay.year, selectedDay.month - 1, selectedDay.day),
    turno: gotTurn,
    idUser: usuario?._id
  }

  const navigate = useNavigate();
  const handleSubmit = async () => {
    const res = await CreateCita(datedb)
    if (res.message) {
      notExito({ textoNot: res.message })
      navigate(routes.agendado)
    } else {
      notError({ textoNot: res.error })
    }
  }

  return (
    <>
      <Helmet><title>Agendar Prueba</title></Helmet>
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-11 col-md-9 mx-auto my-auto">
            <h1 className="h2 mb-4 text-center text-primary" style={{ "fontWeight": "700" }}>Agendar Prueba</h1>

            {/* Versión Pantalla Móvil */}
            <div className="col-12 d-block d-md-none">
              <CalendarTop className='d-flex mb-4 p-4 mx-auto' >
                <div className="col-6 pe-3 me-3 text-center" style={{ "borderRight": "2px solid", "height": "100%" }}>
                  <h2 className="mb-0" style={{ "fontSize": "1rem", "fontWeight": "200", "lineHeight": "1" }}>Fijar cita para: </h2>
                  <h1 className="mb-0" style={{ "fontSize": "5.5rem", "fontWeight": "700", "lineHeight": "1" }}>{selectedDay.day}</h1>
                  <h1 style={{ "fontSize": "2rem", "fontWeight": "700" }}>{months[selectedDay.month - 1]}</h1>
                </div>
                <div className="col-6 pe-3 me-3 text-end d-flex align-items-end flex-column">
                  <h2 className="mb-auto" style={{ "fontSize": "1rem", "fontWeight": "200" }}>Turno: {gotTurn}</h2>
                  <h2 className="mb-0" style={{ "fontSize": "1rem", "fontWeight": "200" }}>{usuario?.personalIDtype + ' ' + usuario?.personalID}</h2>
                  <h2 className="mb-0" style={{ "fontSize": "1rem", "fontWeight": "200" }}>{usuario?.name + ' ' + usuario?.lastnameA + ' ' + usuario?.lastnameB}</h2>
                </div>
              </CalendarTop>
              <CalendarBase className='d-flex justify-content-center'>
                <Calendar
                  locale={myCustomLocale}
                  value={selectedDay}
                  onChange={(e) => TurnoHandle(e)}
                  shouldHighlightWeekends
                  colorPrimary={theme.moradoOscuro}

                  minimumDate={dateNow}
                  maximumDate={{ year: dateNow.year, month: dateNow.month, day: dateNow.day + 30 }}

                  customDaysClassName={desableDate}
                  disabledDays={desableDate2} // here we pass them
                  onDisabledDayError={handleDisabledSelect}
                />
              </CalendarBase>
            </div>

            {/* Versión Pantalla PC */}
            <div className="col-12 mt-3 d-none d-md-flex justify-content-center">
              <CalendarTopB className='me-3 p-4 d-flex flex-column'>
                <div className="text-center">
                  <h2 className="mb-0 mt-3" style={{ "fontSize": "1rem", "fontWeight": "200", "lineHeight": "1" }}>Fijar cita para: </h2>
                  <h1 className="mb-0" style={{ "fontSize": "6.2rem", "fontWeight": "700", "lineHeight": "1" }}>{selectedDay.day}</h1>
                  <h1 style={{ "fontSize": "2.5rem", "fontWeight": "700" }}>{months[selectedDay.month - 1]}</h1>
                  <h2 className="" style={{ "fontSize": "1rem", "fontWeight": "200" }}>Turno: {gotTurn}</h2>
                </div>
                <div className="mt-auto text-center" style={{ "borderTop": "2px solid", "width": "100%" }}>
                  <h2 className="mb-0 mt-4" style={{ "fontSize": "1rem", "fontWeight": "200" }}>{usuario?.name + ' ' + usuario?.lastnameA + ' ' + usuario?.lastnameB}</h2>
                  <h2 className="mb-4" style={{ "fontSize": "1rem", "fontWeight": "200" }}>{usuario?.personalIDtype + ' ' + usuario?.personalID}</h2>
                </div>
              </CalendarTopB>
              <Calendar
                locale={myCustomLocale}
                value={selectedDay}
                onChange={(e) => TurnoHandle(e)}
                shouldHighlightWeekends
                colorPrimary={theme.moradoOscuro}

                minimumDate={dateNow}
                maximumDate={{ year: dateNow.year, month: dateNow.month, day: dateNow.day + 30 }}

                customDaysClassName={desableDate}
                disabledDays={desableDate2} // here we pass them
                onDisabledDayError={handleDisabledSelect}

                calendarClassName="responsive-calendar"
              />
            </div>
            <div className="mt-4 d-flex justify-content-center">
              <BotonMorado type="button" onClick={handleSubmit}>Agendar</BotonMorado>
            </div>
          </div>
        </div>
      </div>
      <Fondo />
    </>
  );
}

export default AgendarCita;

const CalendarBase = styled.div`
        border - radius: 20px;
        background - color: white;
        color: black;
        `;

const CalendarTop = styled.div`
        width: 85%;
        border-radius: 10px 10px 10px 10px;
        background-color: ${theme.moradoOscuro};
        color: white;
        box-shadow: 0 1em 3em rgba(156, 136, 255,0.2);
        `;

const CalendarTopB = styled.div`
        width: 40%;
        border-radius: 10px 10px 10px 10px;
        background-color: ${theme.moradoOscuro};
        color: white;
        box-shadow: 0 1em 3em rgba(156, 136, 255,0.2);
        `;