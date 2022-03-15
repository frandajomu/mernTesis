import { useEffect, useState } from 'react'

export default function useGetResultado({ idResult }) {
    const [resultado, setResultado] = useState({});

    useEffect(() => {
        setResultado(
            {
                id: 1,
                Analisis: "XX",
                SexoFetal: "Femenino",
                T13: "1",
                T18: "1",
                T21: "1",
                recoAnalisis: "Ver con la paciente",
                recoSexoFetal: "Ver con la paciente",
                recoT13: "Ver con la paciente",
                recoT18: "Ver con la paciente",
                recoT21: "Ver con la paciente",
                valorAnalisis: "6",
                valorSexoFetal: "6",
                porcentajeADN: "8.78",
                idUsuario: "8782712"
            }
        );
    }, [])

    return [resultado];
}

