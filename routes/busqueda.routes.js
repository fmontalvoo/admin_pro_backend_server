const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt.middleware');

const { search } = require('../controllers/busqueda.controller');

const router = new Router();

router.get('/', validarJWT, search);

module.exports = router;