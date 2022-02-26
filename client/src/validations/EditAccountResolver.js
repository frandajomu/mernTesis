import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import roles from "../helpers/Roles";

const schema = yup.object().shape({
    name: yup.string().required("Debes ingresar un nombre"),
    lastname: yup.string().required("Debes ingresar un apellido"),
    personalID: yup.string().required("Debes ingresar tu numero de identificación"),
    email: yup.string().required("Debes ingresar un correo"),
    role: yup
        .string()
        .required("Debes seleccionar un rol de usuario")
        .oneOf([roles.admin, roles.medico, roles.laboratorio, roles.paciente], "El rol no es valido"),
})

export default yupResolver(schema);