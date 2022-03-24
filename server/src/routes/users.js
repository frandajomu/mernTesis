const { Router } = require('express');
const router = Router();

const { getUsers, createUser, getOneUser, updateUser, deleteUser, JWTpassportAuth } = require('./../controllers/users.controller')

router.route('/')
        .get(JWTpassportAuth, getUsers)
        .post(JWTpassportAuth,createUser)

router.route('/:id')
        .get(JWTpassportAuth, getOneUser)
        .put(JWTpassportAuth, updateUser)
        .delete(JWTpassportAuth, deleteUser)

module.exports = router;

/*
getAllTables().then((data) => 
        res.send(data)).catch((err) => console.log(err));
next();

getAllTables().then((data) => {
        res.send(data);
        return next();
      }).catch((err) => console.log(err));*/