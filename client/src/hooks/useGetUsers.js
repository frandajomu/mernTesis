import { useEffect, useState } from 'react'
import roles from '../helpers/Roles';

export default function useGetUsers() {
    const [listaUser, setListaUser] = useState([]);

    useEffect(() => {
        setListaUser([
            {
                id: 1,
                name: "Francisco",
                lastnameA: "Joven",
                lastnameB: "Munar",
                personalIDtype: "C.C.",
                personalID: "1007194112",
                datebirth: "26-08-1998",
                genero: "Masculino",
                bloodType: "A",
                blood: "+",
                EPS: "Sanitas",
                celular: "3152661756",
                celular2: "3152661756",
                direccion: "Carrera 9A # 14-102 Sur",
                ciudad: "Pitalito",
                departamento: "Huila",
                email: "u20162151390@usco.edu.co",
                password: "1ui12122132jabdyabsd",
                role: roles.admin
            },
            {
                id: 2,
                name: "Jessica",
                lastnameA: "Cuellar",
                lastnameB: "Marin",
                personalIDtype: "C.C.",
                personalID: "1007194112",
                datebirth: "26-08-1998",
                genero: "Masculino",
                bloodType: "A",
                blood: "+",
                EPS: "Sanitas",
                celular: "3152661756",
                celular2: "3152661756",
                direccion: "Carrera 9A # 14-102 Sur",
                ciudad: "Pitalito",
                departamento: "Huila",
                email: "u20162151390@usco.edu.co",
                password: "1ui12122132jabdyabsd",
                role: roles.medico
            },
            {
                id: 3,
                name: "Juan",
                lastnameA: "Joven",
                lastnameB: "Munar",
                personalIDtype: "C.C.",
                personalID: "1007194112",
                datebirth: "26-08-1998",
                genero: "Masculino",
                bloodType: "A",
                blood: "+",
                EPS: "Sanitas",
                celular: "3152661756",
                celular2: "3152661756",
                direccion: "Carrera 9A # 14-102 Sur",
                ciudad: "Pitalito",
                departamento: "Huila",
                email: "u20162151390@usco.edu.co",
                password: "1ui12122132jabdyabsd",
                role: roles.laboratorio
            },
            {
                id: 4,
                name: "Leandro",
                lastnameA: "Cuellar",
                lastnameB: "Marin",
                personalIDtype: "C.C.",
                personalID: "1007194112",
                datebirth: "26-08-1998",
                genero: "Masculino",
                bloodType: "A",
                blood: "+",
                EPS: "Sanitas",
                celular: "3152661756",
                celular2: "3152661756",
                direccion: "Carrera 9A # 14-102 Sur",
                ciudad: "Pitalito",
                departamento: "Huila",
                email: "u20162151390@usco.edu.co",
                password: "1ui12122132jabdyabsd",
                role: roles.medico
            }
        ]);
    }, [])

    return [listaUser];
}