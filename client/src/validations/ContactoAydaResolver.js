import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    nameUser: yup.string().required("Debes ingresar un nombre"),
    email: yup.string()
    .required("Debes ingresar un correo")
    .matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, "Correo no valido" ),
    mensaje: yup.string().required("Debes ingresar un mensaje"),
})

export default yupResolver(schema);