const { Router } = require('express');
const router = Router();

const { Ingresar, Logout, JWTpassportAuth, SuccessAuth, InfoUser, UpdateInfoUser, UpdatePassword, deleteAccountUser, ForgetPassword, ResetPassword, ContactoAyuda} = require('./../controllers/login.controller')

//Login y logout
router.route('/')
        .post(Ingresar)
        .get(Logout)

//Exito o falla en autenticación inicial
router.get('/successjson', SuccessAuth);
router.get('/failurejson', function (req, res) {
        return res.json({ isAuthenticated: false })
});

//Get información de usuario logeado
router.route('/userInfo')
        .get(JWTpassportAuth, InfoUser)
        .put(JWTpassportAuth, UpdateInfoUser)
        .delete(JWTpassportAuth, deleteAccountUser);

router.route('/updatePass')
        .put(JWTpassportAuth, UpdatePassword);

router.route('/forgetPass')
        .post(ForgetPassword)
        .put(ResetPassword);

router.route('/helpContact')
        .post(ContactoAyuda)

module.exports = router;