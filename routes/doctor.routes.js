const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt.middleware');
const { validarCampos } = require('../middlewares/validar-campos.middleware');

const {
    crearDoctor,
    leerDoctor,
    actualizarDoctor,
    eliminarDoctor,
    obtenerDoctores
} = require('../controllers/doctor.controller');

const router = new Router();

// Middleware

// Rutas
router.post('/', crearDoctor);
router.get('/:id', leerDoctor);
router.put('/:id', actualizarDoctor);
router.delete('/:id', eliminarDoctor);
router.get('/', obtenerDoctores);

module.exports = router;