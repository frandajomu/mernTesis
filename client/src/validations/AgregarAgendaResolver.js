import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    name: yup.string().required("Debes ingresar un nombre"),
    lastnameA: yup.string().required("Debes ingresar tu primer apellido"),
    lastnameB: yup.string().required("Debes ingresar tu segundo apellido"),
    personalID: yup.string()
    .required("Debes ingresar un número de identificación")
    .matches(
      /^\d{6,11}$/,
      "Número de identificación no valido, por favor ingresar sin puntos, ni comas"
    ),
    datebirth: yup.date().required("Debes ingresar fecha de nacimiento"),
    bloodType: yup.string().required("Debes ingresar un tipo de sangre"),
    EPS: yup.string().required("Debes ingresar una EPS"),
    celular: yup.string()
    .required("Debes ingresar tu numero de celular")
    .matches(
      /^(\+\d{1,2}\s)?\d{7,10}$/,
      "Número de celular no valido, por favor ingresar sin puntos, ni comas"
    ),
    embarazo: yup.date().required("Debes ingresar la fecha de inicio del embarazo"),
    email: yup.string().required("Debes ingresar un correo"),
    password: yup
        .string("La contraseña debe ser un texto")
        .required("Debes ingresar una contraseña")
        .min(6, "La contraseña debe ser de minimo 6 caracteres"),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
})

export default yupResolver(schema);