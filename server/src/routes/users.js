const { Router } = require('express');
const router = Router();

const { getUsers, createUser, getOneUser, getOneUserByCedula, usersByRole, usersPaciente, updatePaciente, updateUser, deleteUser, JWTpassportAuth } = require('./../controllers/users.controller')

router.route('/')
        .get(JWTpassportAuth, getUsers)
        .post(JWTpassportAuth, createUser);

router.post('/pacientes', JWTpassportAuth, usersPaciente);
router.put('/pacientes/:id', JWTpassportAuth, updatePaciente);
router.post('/byroles', JWTpassportAuth, usersByRole);

router.route('/:id')
        .get(JWTpassportAuth, getOneUser)
        .put(JWTpassportAuth, updateUser)
        .delete(JWTpassportAuth, deleteUser);

router.route('/cedula/:id')
        .get(JWTpassportAuth, getOneUserByCedula)


module.exports = router;