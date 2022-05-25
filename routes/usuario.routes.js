const { Router } = require('express');

const { getUsuarios } = require('../controllers/usuario.controller');

const router = new Router();

router.get('/', getUsuarios);

module.exports = router;