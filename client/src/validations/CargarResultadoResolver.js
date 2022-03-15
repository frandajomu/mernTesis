import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  Analisis: yup.string()
    .required("Debes ingresar un valor de cromosomas")
    .matches(
      /^([X-Y]{1,5})?([x-y]{1,5})?$/,
      "Valor erroneo, por favor ingrese un valor de cromosomas sin espacio, ejemplo: XX, XY o XXY ."
    ),
  porcentajeADN: yup.string()
    .required("Debes ingresar un valor")
    .matches(
      /^(\d{1,2}(\.\d{1,2})?)$/,
      "Valor erroneo, por favor ingrese un valor con maximo 2 decimales o sin decimales, ejemplo: 8.78, 10 o 9.2"
    ),
  recoAnalisis: yup.string().required("Debes ingresar una recomendación"),
  recoSexoFetal: yup.string().required("Debes ingresar una recomendación"),
  recoT13: yup.string().required("Debes ingresar una recomendación"),
  recoT18: yup.string().required("Debes ingresar una recomendación"),
  recoT21: yup.string().required("Debes ingresar una recomendación")
})

export default yupResolver(schema);