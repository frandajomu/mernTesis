const { Router } = require('express');
const router = Router();

const { JWTpassportAuth, getResultados, getOneResultado, uploadResultado, updateResultado, getEstadisticaPrimera, getEstadisticaSegunda, getEstadisticaPie } = require('./../controllers/resultados.controller')

router.route('/')
    .get(JWTpassportAuth, getResultados)
    .post(JWTpassportAuth, uploadResultado);

router.post('/estaBar', JWTpassportAuth, getEstadisticaPrimera);
router.post('/estaLin', JWTpassportAuth, getEstadisticaSegunda);
router.get('/estaPie', JWTpassportAuth, getEstadisticaPie);

router.route('/:id')
    .get(JWTpassportAuth, getOneResultado)
    .put(JWTpassportAuth, updateResultado)

module.exports = router;