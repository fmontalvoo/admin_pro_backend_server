const { Router } = require('express');

const { crearUsuario, leerUsuario, obtenerUsuarios } = require('../controllers/usuario.controller');

const router = new Router();

// Rutas
router.post('/', crearUsuario);
router.get('/:id', leerUsuario);
router.get('/', obtenerUsuarios);

module.exports = router;