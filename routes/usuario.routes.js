const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarAdmin, validarAdminOrSelf } = require('../middlewares/validar-jwt.middleware');
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
    validarJWT,
    validarAdminOrSelf,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
];

// Rutas
router.post('/', crearUsuarioMiddleware, crearUsuario);
router.get('/:id', validarJWT, leerUsuario);
router.put('/:id', actualizarUsuarioMiddleware, actualizarUsuario);
router.delete('/:id', [validarJWT, validarAdmin], eliminarUsuario);
router.get('/', validarJWT, obtenerUsuarios);

module.exports = router;