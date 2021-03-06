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
const crearDoctorMiddleware = [
    validarJWT,
    check('name', 'El nombre del doctor es obligatorio').not().isEmpty(),
    check('hospital', 'El ID del hospital debe ser valido').isMongoId(),
    validarCampos,
];

const actualizarDoctorMiddleware = [
    validarJWT,
    check('name', 'El nombre del doctor es obligatorio').not().isEmpty(),
    check('hospital', 'El ID del hospital debe ser valido').isMongoId(),
    validarCampos,
];

// Rutas
router.post('/', crearDoctorMiddleware, crearDoctor);
router.get('/:id', leerDoctor);
router.put('/:id', actualizarDoctorMiddleware, actualizarDoctor);
router.delete('/:id', validarJWT, eliminarDoctor);
router.get('/', obtenerDoctores);

module.exports = router;