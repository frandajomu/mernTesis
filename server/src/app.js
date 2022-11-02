const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser')

//Inicializaciones
require('./config/passport');

//Settings
app.get('/', (req, res) => {
    res.send('Bienvenido a ADN Fetal en Sangre Materna')
})
app.set('port', process.env.PORT || 5000);

//Middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    credentials: true
})) //Middleware para enviar y recibir datos entre el Cliente y el Servidor
//app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/login', require('./routes/login'));
app.use('/api/usuarios', require('./routes/users'));
app.use('/api/citas', require('./routes/citas'));
app.use('/api/resultados', require('./routes/resultados'));

module.exports = app;