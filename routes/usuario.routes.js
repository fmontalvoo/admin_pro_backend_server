const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos.middleware');

const { crearUsuario, leerUsuario, obtenerUsuarios } = require('../controllers/usuario.controller');

const router = new Router();

// Middleware
const crearUsuarioMiddleware = [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
];

// Rutas
router.post('/', crearUsuarioMiddleware, crearUsuario);
router.get('/:id', leerUsuario);
router.get('/', obtenerUsuarios);

module.exports = router;