const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;

const UserModel = require('../models/User');

//Estrategia autorización por JWT, para peticiones
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token']
  }
  return token;
}

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.SECRET_TOKEN
    }, async (payload, done) => {
      try {
        const user = await UserModel.findById({ _id: payload.sub })
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err, false)
      }
    }
  ));

//Estrategia de autenticación por passport-local
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      // Confirmando correo
      const user = await UserModel.findOne({ email });
      if (user) {
        const passwordUser = await user.matchPassword(password);
        if (passwordUser) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } else {
        return done(null, false);
      }
    }
  )
);

// Para mostrar u ocultar las cosas a un usuario logeado o no.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});
