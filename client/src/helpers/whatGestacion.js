import { parseISO } from "date-fns";

const whatGestacion = (gestacion2)=>{
    const actualDate = new Date();
    const gestacion= parseISO(gestacion2);
    let milisengundosDia = 24*60*60*1000;
    let milisengundosTranscurridos = Math.abs(gestacion.getTime()-actualDate.getTime());
    let diasTranscurridos = Math.round(milisengundosTranscurridos/milisengundosDia);
    return diasTranscurridos;
}

export default whatGestacion;