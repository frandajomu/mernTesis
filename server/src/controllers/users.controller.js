const UserModel = require('../models/User');
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
        res.json({ error: 'No hay pacientes con este rol' });
    }
}

//Petición para ver lista de pacientes segun agendado o realizado
usersCtrl.usersPaciente = async (req, res) => {
    const { estado } = req.body
    if (estado === 'Realizado' || estado === 'Agendado' ) {
        const usuarios = await UserModel.find({ role: 'Paciente' , estado: estado }).clone();
        return res.json(usuarios);
    } else {
        res.json({ error: 'Ha ocurrido un error' });
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

//Petición borrar usuario
usersCtrl.deleteUser = async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id)
        return res.json({ message: 'Usuario eliminado' });
    } catch (e) {
        return res.json({ error: 'Hubo un error, usuario no eliminado' });
    }
}

module.exports = usersCtrl;