import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    password: yup
        .string("La contraseña debe ser un texto")
        .required("Debes ingresar una contraseña")
        .min(6, "La contraseña debe ser de minimo 6 caracteres"),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
})

export default yupResolver(schema);