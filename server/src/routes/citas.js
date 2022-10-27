const { Router } = require('express');
const router = Router();

const { JWTpassportAuth, getCita, getOneCita, createCita, updateCita, deleteCita, getTurno, desableDate, valueParams, createParams, updateParams, updateEstado } = require('./../controllers/citas.controller')

router.route('/')
    .get(JWTpassportAuth, getCita)
    .post(JWTpassportAuth, createCita);

router.route('/turno')
    .get(JWTpassportAuth, desableDate)
    .post(JWTpassportAuth, getTurno);

router.post('/cancelar', JWTpassportAuth, updateEstado);

router.route('/globalParams')
    .get(JWTpassportAuth, valueParams)
    .post(JWTpassportAuth, createParams)
    .put(JWTpassportAuth, updateParams);

router.route('/:id')
    .get(JWTpassportAuth, getOneCita)
    .put(JWTpassportAuth, updateCita)
    .delete(JWTpassportAuth, deleteCita);

module.exports = router;