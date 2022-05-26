const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt.middleware');

const { search, searchInCollection } = require('../controllers/busqueda.controller');

const router = new Router();

router.get('/', validarJWT, search);
router.get('/:collection', validarJWT, searchInCollection);

module.exports = router;