import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Fondo from '../elements/Fondo';
import { ContenedorMayor, SelectorA } from '../elements/Formularios';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import useGetBars from '../hooks/estadisticas/useGetBars';
import useGetLine from '../hooks/estadisticas/useGetLine';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, Filler);

const options = {
  type: 'bar',
  responsive: true,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
}
const options2 = {
  type: 'line',
  responsive: true,

}

const Estadisticas = () => {

  //Grafica de Barras
  const [manT21] = useGetBars({ 'SexoFetal': 'Masculino', 'Trisomia': 'T21' });
  const [manT18] = useGetBars({ 'SexoFetal': 'Masculino', 'Trisomia': 'T18' });
  const [manT13] = useGetBars({ 'SexoFetal': 'Masculino', 'Trisomia': 'T13' });
  const [femT21] = useGetBars({ 'SexoFetal': 'Femenino', 'Trisomia': 'T21' });
  const [femT18] = useGetBars({ 'SexoFetal': 'Femenino', 'Trisomia': 'T18' });
  const [femT13] = useGetBars({ 'SexoFetal': 'Femenino', 'Trisomia': 'T13' });
  const trisomia = ['Trisomía 21', 'Trisomía 18', 'Trisomía 13'];
  const woman = [femT21, femT18, femT13];
  const man = [manT21, manT18, manT13];

  //Grafica de Linea
  const lineT21 = useGetLine({ 'Trisomia': 'T21' });
  const lineT18 = useGetLine({ 'Trisomia': 'T18' });
  const lineT13 = useGetLine({ 'Trisomia': 'T13' });
  const edad = ['Menores de 35', 'Entre 35 y 39', 'Entre 40 y 45', 'Mayores de 45'];
  const scores = lineT21[0].map(function (x) { return x * 100; });;
  const scores2 = lineT18[0].map(function (x) { return x * 100; });;
  const scores3 = lineT13[0].map(function (x) { return x * 100; });;

  //Logica Renderización de Formulario
  const [option, setOption] = useState("Trisomías vs Casos Confirmados");


  const dataBars = {
    labels: trisomia,
    datasets: [
      {
        label: 'Femenino',
        data: woman,
        backgroundColor: 'rgb(36, 26, 68)',
      },
      {
        label: 'Masculino',
        data: man,
        backgroundColor: 'rgb(237, 109, 26)',
      },]
  }

  const dataLineal = {
    labels: edad,
    datasets: [
      {
        label: "Trisomía 21",
        data: scores,
        tension: 0.3,
        borderColor: "rgb(36, 26, 68)",
        pointBackgroundColor: 'rgb(36, 26, 68)',
        backgroundColor: 'rgb(36, 26, 68)',
        pointRadius: 6,
      },
      {
        label: "Trisomía 18",
        tension: 0.3,
        data: scores2,
        borderColor: "rgb(237, 109, 26)",
        pointBackgroundColor: 'rgb(237, 109, 26)',
        backgroundColor: 'rgb(237, 109, 26)',
        pointRadius: 6,
      },
      {
        label: "Trisomía 13",
        tension: 0.3,
        data: scores3,
        borderColor: "rgb(0, 138, 154)",
        pointBackgroundColor: "rgb(0, 138, 154)",
        backgroundColor: "rgb(0, 138, 154)",
        pointRadius: 6,
      },
    ]
  };


  return (
    <>
      <Helmet><title>Estadísticas</title></Helmet>
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-8 mx-auto my-auto">
            <h1 className="h2 mb-4 text-center text-primary" style={{ "fontWeight": "700" }}>Estadísticas</h1>
            <div className="row">
              <div className="col-12 mb-3">
                <label className="mb-1 my-auto" style={{ "fontWeight": "500" }}>Graficar: </label>
                <SelectorA className="ms-3 mt-2 mt-md-0" onChange={(e) => {
                  const selectorOption = e.target.value;
                  setOption(selectorOption);
                }}>
                  <option defaultValue>Trisomías vs Casos Confirmados</option>
                  <option value='Edad de la madre vs % de Riesgo'>Edad de la madre vs % de Riesgo</option>
                </SelectorA>
              </div>
            </div>
            <ContenedorMayor lista>
              {option === 'Trisomías vs Casos Confirmados' ?
                <Bar data={dataBars} options={options} />
                :
                <Line data={dataLineal} options={options2} />
              }
            </ContenedorMayor>
          </div>
        </div>
      </div>
      <Fondo />
    </>
  );
}

export default Estadisticas;

