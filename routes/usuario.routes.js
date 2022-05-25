const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos.middleware');

const {
    crearUsuario,
    leerUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerUsuarios
} = require('../controllers/usuario.controller');

const router = new Router();

// Middleware
const crearUsuarioMiddleware = [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
];

const actualizarUsuarioMiddleware = [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
];

// Rutas
router.post('/', crearUsuarioMiddleware, crearUsuario);
router.get('/:id', leerUsuario);
router.put('/:id', actualizarUsuarioMiddleware, actualizarUsuario);
router.delete('/:id', eliminarUsuario);
router.get('/', obtenerUsuarios);

module.exports = router;