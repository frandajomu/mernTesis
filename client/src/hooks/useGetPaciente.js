import { useEffect, useState } from 'react'

export default function useGetPacientes() {
    const [listaPacientes, setListaPacientes] = useState([]);

    useEffect(() => {
        setListaPacientes([
            {   
                id: 1,
                name: "Jessica",
                lastnameA: "Joven",
                lastnameB: "Cuellar",
                personalIDtype: "C.C.",
                personalID: "1008916787",
                genero: "Femenino",
                role: "Paciente",
                estado: "Agendado",
                embarazo: "12",
                EPS: "Sanitas",
                bloodType: "A",
                blood: "+",
                recomendacion: "No importa por ahora...",
                datebirth: 547707600,
                email: "dipas12@hotmail.com",
                password: "123456",
                passwordConfirmation: "123456",
                checkbox: false,
                celular: "3105826080",
                celular2: "3212299782",
                direccion: "Carrera 8A Este # 14 - 101 Sur",
                ciudad: "Pitalito",
                departamento: "Huila",
            },
            {   
                id: 2,
                name: "Maria",
                lastnameA: "Artunduaga",
                lastnameB: "Mendez",
                personalIDtype: "C.C.",
                personalID: "1008916787",
                genero: "Femenino",
                role: "Paciente",
                estado: "Agendado",
                embarazo: "10",
                EPS: "Sanitas",
                bloodType: "A",
                blood: "+",
                recomendacion: "No importa por ahora...",
                datebirth: 547707600,
                email: "dipas12@hotmail.com",
                password: "123456",
                passwordConfirmation: "123456",
                checkbox: false,
                celular: "3105826080",
                celular2: "3212299782",
                direccion: "Carrera 8A Este # 14 - 101 Sur",
                ciudad: "Pitalito",
                departamento: "Huila",
            },
            {   
                id: 3,
                name: "Sara",
                lastnameA: "Ortiz",
                lastnameB: "Sanchez",
                personalIDtype: "C.C.",
                personalID: "1008916787",
                genero: "Femenino",
                role: "Paciente",
                estado: "Realizado",
                embarazo: "11",
                EPS: "Sanitas",
                bloodType: "A",
                blood: "+",
                recomendacion: "No importa por ahora...",
                datebirth: 547707600,
                email: "dipas12@hotmail.com",
                password: "123456",
                passwordConfirmation: "123456",
                checkbox: false,
                celular: "3105826080",
                celular2: "3212299782",
                direccion: "Carrera 8A Este # 14 - 101 Sur",
                ciudad: "Pitalito",
                departamento: "Huila"
            },
            {   
                id: 4,
                name: "Katherine",
                lastnameA: "Peña",
                lastnameB: "Hernandez",
                personalIDtype: "C.C.",
                personalID: "1008916787",
                genero: "Femenino",
                role: "Paciente",
                estado: "Agendado",
                embarazo: "10",
                EPS: "Sanitas",
                bloodType: "A",
                blood: "+",
                recomendacion: "No importa por ahora...",
                datebirth: 547707600,
                email: "dipas12@hotmail.com",
                password: "123456",
                passwordConfirmation: "123456",
                checkbox: false,
                celular: "3105826080",
                celular2: "3212299782",
                direccion: "Carrera 8A Este # 14 - 101 Sur",
                ciudad: "Pitalito",
                departamento: "Huila"
            }
        ]);
    }, [])

    return [listaPacientes];
}


