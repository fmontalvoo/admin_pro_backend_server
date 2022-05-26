const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');

const { validarCampos } = require('../middlewares/validar-campos.middleware');

const router = new Router();

// Middleware
const loginMiddleware = [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
];

// Rutas
router.post('/login', loginMiddleware, login);

module.exports = router;