const { Router } = require('express');
const { check } = require('express-validator');

const { login, renewToken, loginWithGoogle } = require('../controllers/auth.controller');

const { validarJWT } = require('../middlewares/validar-jwt.middleware');
const { validarCampos } = require('../middlewares/validar-campos.middleware');

const router = new Router();

// Middleware
const loginMiddleware = [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
];

// Rutas
router.get('/renew', validarJWT, renewToken);
router.post('/login', loginMiddleware, login);
router.post('/login/google', loginWithGoogle);

module.exports = router;