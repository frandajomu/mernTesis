const UserModel = require('../models/User');
const CitasModel = require('./../models/Cita');
const ResultadosModel = require('./../models/Resultado');
const usersCtrl = {};
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Passport JWT atenticación para comprobar usuario
usersCtrl.JWTpassportAuth = passport.authenticate('jwt', { session: false });

//Petición para ver lista de usuarios
usersCtrl.getUsers = async (req, res) => {
    const usuarios = await UserModel.find();
    return res.json(usuarios);
}

//Petición para ver lista de usuarios segun el rol
usersCtrl.usersByRole = async (req, res) => {
    const { role } = req.body
    if (role === 'Administrador' || role === 'Médico' || role === 'Laboratorio' || role === 'Paciente') {
        const usuarios = await UserModel.find({ role: role }).clone();
        return res.json(usuarios);
    } else {
        res.json({ error: 'No hay usuarios con este rol' });
    }
}

//Petición creación de un nuevo usuario
usersCtrl.createUser = async (req, res) => {
    const { name, lastnameA, lastnameB, personalIDtype, personalID, datebirth, genero, bloodType, blood, EPS, celular, celular2, direccion, ciudad, departamento, email, password, passwordConfirmation, role, estado, embarazo, recomendacion } = req.body;
    const emailUser = await UserModel.findOne({ email: email })
    const numberIDUser = await UserModel.findOne({ personalID: personalID })
    if (emailUser) {
        return res.json({ error: 'El correo ya existe en la base de datos' })
    } else if (numberIDUser) {
        return res.json({ error: 'El número de identificación ya existe en la base de datos' })
    } else if (password !== passwordConfirmation) {
        return res.json({ error: 'Las contraseñas no coinciden' })
    } else if (password.length < 6) {
        return res.json({ error: 'La contraseña debe tener más de 6 caracteres' })
    } else {
        const newUser = new UserModel({
            name, lastnameA, lastnameB, personalIDtype, personalID, datebirth, genero, bloodType, blood, EPS, celular, celular2, direccion, ciudad, departamento, email, password, role, estado, embarazo, recomendacion
        })
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        return res.json({ message: 'Usuario creado con exito' });
    }
}

//Petición editar datos de un usuario
usersCtrl.updateUser = async (req, res) => {
    const { name, lastnameA, lastnameB, personalIDtype, personalID, datebirth, genero, bloodType, blood, EPS, celular, celular2, direccion, ciudad, departamento, email, password, passwordConfirmation, role, estado, embarazo, recomendacion } = req.body;

    const emailUser = await UserModel.findOne({ email: email })
    const numberIDUser = await UserModel.findOne({ personalID: personalID })
    const ActualData = await UserModel.findById(req.params.id).clone()
    if (email !== ActualData.email) {
        if (emailUser) {
            return res.json({ error: 'El correo ya existe en la base de datos' })
        } else {
            return null
        }
    } else if (personalID !== ActualData.personalID) {
        if (numberIDUser) {
            return res.json({ error: 'El número de identificación ya existe en la base de datos' })
        } else {
            return null
        }
    } else if (password !== passwordConfirmation) {
        return res.json({ error: 'Las contraseñas no coinciden' })
    } else if (password.length < 6) {
        return res.json({ error: 'La contraseña debe tener más de 6 caracteres' })
    } else {
        await UserModel.findById(req.params.id, async (err, doc) => {
            if (err) return false;
            doc.name = name; doc.lastnameA = lastnameA; doc.lastnameB = lastnameB; doc.personalIDtype = personalIDtype; doc.personalID = personalID; doc.datebirth = datebirth; doc.genero = genero; doc.bloodType = bloodType; doc.blood = blood; doc.EPS = EPS; doc.celular = celular; doc.celular2 = celular2; doc.direccion = direccion; doc.ciudad = ciudad; doc.departamento = departamento; doc.email = email; doc.role = role; doc.estado = estado; doc.embarazo = embarazo, doc.recomendacion = recomendacion;

            const salt = await bcrypt.genSalt(10);
            doc.password = await bcrypt.hash(password, salt);
            doc.save();
        }).clone();
        return res.json({ message: 'Usuario actualizado con exito' });
    }
}

//Petición buscar y devolver un usuario según el ID
usersCtrl.getOneUser = async (req, res) => {
    const usuario = await UserModel.findById(req.params.id)
    return res.json(usuario);
}

//Petición buscar y devolver un usuario según la cedula
usersCtrl.getOneUserByCedula = async (req, res) => {
    const usuario = await UserModel.findOne({ personalID: req.params.id })
    return res.json(usuario);
}

//Petición para ver lista de pacientes
usersCtrl.usersPaciente = async (req, res) => {
    const { estado, sorted } = req.body
    const today = new Date();
    if(sorted === 'Más antiguos'){
        if (estado === 'Ordenado') {
            const usuarios = await UserModel.find({ role: 'Paciente', estado: estado }).sort({createdAt:1});
            return res.json(usuarios);
        } else if (estado === 'Agendado') {
            const usuarios = await CitasModel.find({ citadate: { $gte: today.setDate(today.getDate() - 0.5) }, estado: 'Nulo' }).populate('idUser').sort({citadate:-1});
            //const ids = dates.map(dataUser => { return dataUser.idUser });
            //const usuarios = await UserModel.find({ '_id': { $in: ids }, estado: estado, role: 'Paciente' }).clone();
            return res.json(usuarios);
        } else if (estado === 'Realizado') {
            const usuarios = await CitasModel.find({ estado: 'Realizado' }).populate('idUser').sort({citadate:-1});
            return res.json(usuarios);
        } else if (estado === 'Resultado') {
            const actualUser = req.user;
            if(actualUser.role === 'Paciente'){
                const usuarios = await CitasModel.find({ estado: 'Resultado', idUser: actualUser._id }).populate('idUser').sort({citadate:-1});
                return res.json(usuarios);
            }else{
                const usuarios = await CitasModel.find({ estado: 'Resultado' }).populate('idUser').sort({citadate:-1});
                return res.json(usuarios);
            }
    
        } else if (estado === 'Cancelado') {
            const usuarios1 = await CitasModel.find({ citadate: { $lt: today.setDate(today.getDate() - 0.5) }, estado: 'Nulo' }).populate('idUser').sort({citadate:-1});
            const usuarios2 = await CitasModel.find({ estado: 'Cancelado' }).populate('idUser').sort({citadate:-1});
            const totalUsers = usuarios1.concat(usuarios2);
            return res.json(totalUsers);
        } else {
            res.json({ error: 'Ha ocurrido un error' });
        }
    }else{
        if (estado === 'Ordenado') {
            const usuarios = await UserModel.find({ role: 'Paciente', estado: estado }).sort({createdAt:-1});
            return res.json(usuarios);
        } else if (estado === 'Agendado') {
            const usuarios = await CitasModel.find({ citadate: { $gte: today.setDate(today.getDate() - 0.5) }, estado: 'Nulo' }).populate('idUser').sort({citadate:1});
            //const ids = dates.map(dataUser => { return dataUser.idUser });
            //const usuarios = await UserModel.find({ '_id': { $in: ids }, estado: estado, role: 'Paciente' }).clone();
            return res.json(usuarios);
        } else if (estado === 'Realizado') {
            const usuarios = await CitasModel.find({ estado: 'Realizado' }).populate('idUser').sort({citadate:1});
            return res.json(usuarios);
        } else if (estado === 'Resultado') {
            const actualUser = req.user;
            if(actualUser.role === 'Paciente'){
                const usuarios = await CitasModel.find({ estado: 'Resultado', idUser: actualUser._id }).populate('idUser').sort({citadate:1});
                return res.json(usuarios);
            }else{
                const usuarios = await CitasModel.find({ estado: 'Resultado' }).populate('idUser').sort({citadate:1});
                return res.json(usuarios);
            }
    
        } else if (estado === 'Cancelado') {
            const usuarios1 = await CitasModel.find({ citadate: { $lt: today.setDate(today.getDate() - 0.5) }, estado: 'Nulo' }).populate('idUser').sort({citadate:1});
            const usuarios2 = await CitasModel.find({ estado: 'Cancelado' }).populate('idUser').sort({citadate:1});
            const totalUsers = usuarios1.concat(usuarios2);
            return res.json(totalUsers);
        } else {
            res.json({ error: 'Ha ocurrido un error' });
        }
    }
}

//Petición buscar y devolver un usuario según la cedula
usersCtrl.findAndUpdateOneStateUser = async (req, res) => {
    const { estado } = req.body;
    const usuario = await UserModel.findOne({ personalID: req.params.id })
    if (usuario) {
        if (usuario.role === 'Paciente') {
            await UserModel.findOneAndUpdate({ _id: usuario._id }, { estado: estado });
            return res.json({ message: 'Prueba ordenada exitosamente' });
        } else {
            return res.json({ error: 'El documento de identificación no corresponde a un paciente' })
        }
    } else {
        return res.json({ error: 'El documento de identificación no existe en la base de datos.' })
    }
}



//Petición editar datos de un usuario
usersCtrl.updatePaciente = async (req, res) => {
    const { estado } = req.body;
    const ActualData = await UserModel.findById(req.params.id).clone()
    if (ActualData.role === 'Paciente') {
        await UserModel.findOneAndUpdate({ _id: req.params.id }, { estado: estado });
        return res.json({ message: 'Estado actualizado' });
    } else {
        return res.json({ error: 'Error al actualizar el estado del paciente' })
    }
}

//Petición borrar usuario
usersCtrl.deleteUser = async (req, res) => {
    try {
        const usuario = await UserModel.findById(req.params.id).clone()
        if (usuario.role === 'Paciente') {
            //Eliminando datos de resultados
            const dataInfo = await CitasModel.find({ idUser: req.params.id }).clone();
            const ids = dataInfo.map(dataUser => { return dataUser._id });
            await ResultadosModel.deleteMany({ idCita: { $in: ids }}).clone();
            //Eliminando datos de citas
            await CitasModel.deleteMany({ idUser: req.params.id }).clone();
            //Eliminando cuenta del paciente
            await UserModel.findByIdAndDelete(req.params.id)
            return res.json({ message: 'Datos eliminados exitosamente' });
        } else {
            await UserModel.findByIdAndDelete(req.params.id)
            return res.json({ message: 'Usuario eliminado' });
        }
    } catch (e) {
        return res.json({ error: 'Hubo un error, registros no eliminados' });
    }
}

//Petición Saber si ya hay Administrador
usersCtrl.inicialAdmin = async (req, res) => {
    try {
        const admin = await UserModel.findOne({ role: 'Administrador' })
        if (admin) {
            return res.json({ message: true });
        } else {
            return res.json({ message: false });
        }
    } catch (e) {
        return res.json({ error: 'Hubo un error' });
    }
}
//Petición Saber si ya hay Administrador
usersCtrl.inicialAdminB = async (req, res) => {
    try {
        const admin = await UserModel.findOne({ role: 'Administrador' })
        if (admin) {
            return res.json({ error: 'Ya existe un Administrador en la base de datos' });
        } else {
            const { name, lastnameA, lastnameB, personalIDtype, personalID, datebirth, genero, bloodType, blood, EPS, celular, celular2, direccion, ciudad, departamento, email, password, passwordConfirmation, role, estado, embarazo, recomendacion } = req.body;
            const emailUser = await UserModel.findOne({ email: email })
            const numberIDUser = await UserModel.findOne({ personalID: personalID })
            if (emailUser) {
                return res.json({ error: 'El correo ya existe en la base de datos' })
            } else if (numberIDUser) {
                return res.json({ error: 'El número de identificación ya existe en la base de datos' })
            } else if (password !== passwordConfirmation) {
                return res.json({ error: 'Las contraseñas no coinciden' })
            } else if (password.length < 6) {
                return res.json({ error: 'La contraseña debe tener más de 6 caracteres' })
            } else {
                const newUser = new UserModel({
                    name, lastnameA, lastnameB, personalIDtype, personalID, datebirth, genero, bloodType, blood, EPS, celular, celular2, direccion, ciudad, departamento, email, password, role, estado, embarazo, recomendacion
                })
                newUser.password = await newUser.encryptPassword(password);
                await newUser.save();
                return res.json({ message: 'Usuario creado con exito' });
            }
        }
    } catch (e) {
        return res.json({ error: 'Hubo un error' });
    }
}

module.exports = usersCtrl;