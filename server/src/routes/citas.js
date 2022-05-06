const { Router } = require('express');
const router = Router();

const { getCita, getOneCita, createCita, deleteCita, getTurno, desableDate } = require('./../controllers/citas.controller')

router.route('/')
    .get(getCita)
    .post(createCita);

router.route('/turno')
    .get(desableDate)
    .post(getTurno);
    
router.route('/:id')
    .get(getOneCita)
    .delete(deleteCita);



module.exports = router;