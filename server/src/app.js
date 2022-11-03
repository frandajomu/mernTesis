const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser')
const path = require('path');

//Inicializaciones
require('./config/passport');

//Setting
app.set('port', process.env.PORT || 5000);

//Middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    credentials: true
}))
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

//Solo para carga se copia el build de React en la carpeta server y descomentar
/*
app.use(express.static('build'));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname,'../build/index.html'));
});
*/

module.exports = app;