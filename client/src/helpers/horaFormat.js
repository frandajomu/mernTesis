import { parseISO } from "date-fns";

const months = ["Enero", "Febrero", "Marzo","Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const formatearFecha = (fecha2)=>{
    const fecha = parseISO(fecha2);
    let formatted_date = fecha.getDate() + " de " + months[fecha.getMonth()] + " del " + fecha.getFullYear()
    return formatted_date;
}

export default formatearFecha;