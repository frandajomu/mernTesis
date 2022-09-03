const { Router } = require('express');
const router = Router();

const { getResultados, getOneResultado, uploadResultado, updateResultado, getEstadisticaPrimera, getEstadisticaSegunda, getEstadisticaPie } = require('./../controllers/resultados.controller')

router.route('/')
    .get(getResultados)
    .post(uploadResultado);

router.post('/estaBar', getEstadisticaPrimera);
router.post('/estaLin', getEstadisticaSegunda);
router.get('/estaPie', getEstadisticaPie);

router.route('/:id')
    .get(getOneResultado)
    .put(updateResultado)

module.exports = router;