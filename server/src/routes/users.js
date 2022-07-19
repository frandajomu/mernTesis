const { Router } = require('express');
const router = Router();

const { getUsers, createUser, getOneUser, getOneUserByCedula, findAndUpdateOneStateUser, usersByRole, usersPaciente, updatePaciente, updateUser, deleteUser, inicialAdmin, inicialAdminB, JWTpassportAuth } = require('./../controllers/users.controller');

router.route('/')
        .get(JWTpassportAuth, getUsers)
        .post(JWTpassportAuth, createUser);

router.route('/adminCreate')
        .get(inicialAdmin)
        .post(inicialAdminB);

router.post('/pacientes', JWTpassportAuth, usersPaciente);
router.put('/pacientes/:id', JWTpassportAuth, updatePaciente);
router.post('/byroles', JWTpassportAuth, usersByRole);

router.route('/cedula/:id')
        .get(JWTpassportAuth, getOneUserByCedula)
        .put(JWTpassportAuth, findAndUpdateOneStateUser);

router.route('/:id')
        .get(JWTpassportAuth, getOneUser)
        .put(JWTpassportAuth, updateUser)
        .delete(JWTpassportAuth, deleteUser);

module.exports = router;