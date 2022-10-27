import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    email: yup.string()
    .required("Debes ingresar un correo")
    .matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, "Correo no valido" ),
})

export default yupResolver(schema);