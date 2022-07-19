const { Router } = require('express');
const router = Router();

const { getCita, getOneCita, createCita, updateCita, deleteCita, getTurno, desableDate, valueParams, createParams, updateParams, updateEstado } = require('./../controllers/citas.controller')

router.route('/')
    .get(getCita)
    .post(createCita);

router.route('/turno')
    .get(desableDate)
    .post(getTurno);

router.post('/cancelar', updateEstado);

router.route('/globalParams')
    .get(valueParams)
    .post(createParams)
    .put(updateParams);

router.route('/:id')
    .get(getOneCita)
    .put(updateCita)
    .delete(deleteCita);

module.exports = router;