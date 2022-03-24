const loginCtrl = {};
const passport = require('passport');

//Passport JWT autenticación para autorizar al usuario a realizar peticiones a la DB
loginCtrl.JWTpassportAuth = passport.authenticate('jwt', {session: false});

//Petición Login
loginCtrl.Ingresar = passport.authenticate('local', {
    successRedirect: '/api/login/successjson',
    failureRedirect: '/api/login/failurejson'
});

//Petición para Logout
loginCtrl.Logout = async (req, res) => {
    res.clearCookie('access_token')
    res.json({ message: 'Logout Exitoso' });
}

module.exports = loginCtrl;