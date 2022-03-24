const { Router } = require('express');
const router = Router();
const JWT = require('jsonwebtoken');

const { Ingresar, Logout, JWTpassportAuth } = require('./../controllers/login.controller')

//Creando el token de usuario
const signToken = (userID) => {
        return JWT.sign({
                iss: process.env.SECRET_TOKEN,
                sub: userID
        }, process.env.SECRET_TOKEN, { expiresIn: '18h' })
}

router.route('/')
        .post(Ingresar)
        .get(JWTpassportAuth, Logout)


router.get('/successjson', function (req, res) {
        if (req.isAuthenticated()) {
                const { _id, role } = req.user;
                const token = signToken(_id)
                res.cookie('access_token', token, { httpOnly: true, sameSite: true });

                return res.status(200).json({ isAuthenticated: true, user: { role } });
        } else {
                return res.json({ isAuthenticated: false })
        }
});

router.get('/failurejson', function (req, res) {
        return res.json({ isAuthenticated: false })
});


module.exports = router;