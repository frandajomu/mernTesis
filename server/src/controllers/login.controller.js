const loginCtrl = {};
const passport = require('passport');
const UserModel = require('../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {sendMail, contactMail} = require('../config/emailer');

//Creando el token de usuario
const signToken = (userID) => {
    return JWT.sign({
        iss: process.env.SECRET_TOKEN,
        sub: userID
    }, process.env.SECRET_TOKEN, { expiresIn: '18h' })
}

//Passport JWT autenticación para autorizar al usuario a realizar peticiones a la DB
loginCtrl.JWTpassportAuth = passport.authenticate('jwt', { session: false });

//Petición Login
loginCtrl.Ingresar = passport.authenticate('local', {
    successRedirect: '/api/login/successjson',
    failureRedirect: '/api/login/failurejson'
});

//Autentificación inicio exitosa
loginCtrl.SuccessAuth = (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, role } = req.user;
        const token = signToken(_id)
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });

        return res.status(200).json({ isAuthenticated: true, user: { role } });
    } else {
        return res.json({ isAuthenticated: false })
    }
}

//Petición para Logout
loginCtrl.Logout = async (req, res) => {
    res.clearCookie('access_token')
    res.json({ message: 'Logout Exitoso' });
}

//Get Información de Usuario Logueado
loginCtrl.InfoUser = async (req, res) => {
    try {
        const { name, lastnameA, lastnameB, personalIDtype, personalID, datebirth, genero, bloodType, blood, EPS, celular, celular2, direccion, ciudad, departamento, email, role } = await UserModel.findById({ _id: req.user.id })
        res.json({ user: { name, lastnameA, lastnameB, personalIDtype, personalID, datebirth, genero, bloodType, blood, EPS, celular, celular2, direccion, ciudad, departamento, email, role } });
    } catch (e) {
        res.json({ error: 'Ha ocurrido un error' + e })
    }
}

//Put actualización información perfil de Usuario Logueado
loginCtrl.UpdateInfoUser = async (req, res) => {
    const { name, lastnameA, lastnameB, personalIDtype, personalID, datebirth, genero, bloodType, blood, EPS, celular, celular2, direccion, ciudad, departamento, email } = req.body;

    const emailUser = await UserModel.findOne({ email: email });
    const numberIDUser = await UserModel.findOne({ personalID: personalID });
    const ActualData = req.user;
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
    } else {
        await UserModel.findByIdAndUpdate(req.user.id, { name, lastnameA, lastnameB, personalIDtype, personalID, datebirth, genero, bloodType, blood, EPS, celular, celular2, direccion, ciudad, departamento, email })
        return res.json({ message: 'Usuario actualizado con exito' });
    }
}

loginCtrl.UpdatePassword = async (req, res) => {
    const { oldPassword, password, passwordConfirmation } = req.body;
    const user = await UserModel.findById({ _id: req.user.id }).clone();
    const passwordUser = await user.matchPassword(oldPassword);
    if (passwordUser) {
        if (password !== passwordConfirmation) {
            return res.json({ error: 'Las contraseñas no coinciden' })
        } else if (password.length < 6) {
            return res.json({ error: 'La contraseña debe tener más de 6 caracteres' })
        } else {
            await UserModel.findById(req.user.id, async (err, doc) => {
                if (err) return false;

                const salt = await bcrypt.genSalt(10);
                doc.password = await bcrypt.hash(password, salt);
                doc.save();
            }).clone();
            return res.json({ message: 'Contraseña cambiada correctamente' });
        }
    } else {
        return res.json({ message: 'La contraseña actual no es correcta' });
    }

}

const resetToken = process.env.RESET_TOKEN
loginCtrl.ForgetPassword = async (req, res) => {
    const { email } = req.body;
    try{
        const emailUser = await UserModel.findOne({ email: email });
        if(emailUser){
            const secret = resetToken + emailUser.password
            const userID = String(emailUser._id)
            const payload = {
                email: emailUser.email,
                id: userID
            }
            const token = JWT.sign(payload, secret, { expiresIn: '15m' })
            const link =  `https://adnfetal.up.railway.app/reset-password/${userID}/${token}`
            sendMail(email, link)
            return res.json({ message: 'Revisa tu correo electrónico' });
        }else{
            return res.json({ error: 'Parece que algo fue mal' });
        }
    }catch(err){
        return res.json({ error: 'Ocurrió un error' });
    }
}

loginCtrl.ResetPassword = async (req, res) => {
    const { password, passwordConfirmation, id, token } = req.body;
    const user = await UserModel.findById({ _id: id }).clone();
    if(user){
        const secret = resetToken + user.password
        try {
            JWT.verify(token, secret);
            if (password !== passwordConfirmation) {
                return res.json({ error: 'Las contraseñas no coinciden' })
            } else if (password.length < 6) {
                return res.json({ error: 'La contraseña debe tener más de 6 caracteres' })
            } else {
                await UserModel.findById( id, async (err, doc) => {
                    if (err) return false;
    
                    const salt = await bcrypt.genSalt(10);
                    doc.password = await bcrypt.hash(password, salt);
                    doc.save();
                }).clone();
                return res.json({ message: 'Contraseña cambiada correctamente' });
            }
        } catch (error) {
            return res.json({ error: '¡Error! El link ya caduco. Envia un nuevo link para cambiar tu contraseña' });
        }
    }else{
        return res.json({ error: 'Parece que no eres un usuario' });
    }
}

//Petición borrar usuario
loginCtrl.deleteAccountUser = async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.user.id)
        return res.json({ message: 'Cuenta eliminada con exito' });
    } catch (err) {
        return res.json({ error: 'Hubo un error, cuenta no eliminada' });
    }
}

//Ayuda y contacto
loginCtrl.ContactoAyuda = async (req, res) => {
    const { nameUser, email, optionSelected, mensaje } = req.body;
    try{
        contactMail(nameUser, email, optionSelected, mensaje)
        return res.json({ message: 'Mensaje enviado, te responderemos pronto en tu email.' });
    }catch(err){
        return res.json({ error: 'Ocurrio un error' });
    }
}

module.exports = loginCtrl;