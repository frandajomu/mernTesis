import { useEffect, useState } from 'react'
import roles from '../helpers/Roles';

export default function useGetUsuario({id}) {
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        setUsuario(
            {
                id: 1,
                name: "Francisco",
                lastnameA: "Joven",
                lastnameB: "Munar",
                personalIDtype: "C.C.",
                personalID: "1007194112",
                datebirth: 1643691600,
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
                passwordConfirmation: "1ui12122132jabdyabsd",
                role: roles.admin
            }
        );
    }, [])

    return [usuario];
}