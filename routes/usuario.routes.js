const { Router } = require('express');

const { crearUsuario, obtenerUsuarios } = require('../controllers/usuario.controller');

const router = new Router();

// Rutas
router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);

module.exports = router;