const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt.middleware');
const { validarCampos } = require('../middlewares/validar-campos.middleware');

const {
    crearHospital,
    leerHospital,
    actualizarHospital,
    eliminarHospital,
    obtenerHospitales
} = require('../controllers/hospital.controller');

const router = new Router();

// Middleware
const crearHospitalMiddleware = [
    validarJWT,
    check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos,
];

const actualizarHospitalMiddleware = [
    validarJWT,
    check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos,
];

// Rutas
router.post('/', crearHospitalMiddleware, crearHospital);
router.get('/:id', leerHospital);
router.put('/:id', actualizarHospitalMiddleware, actualizarHospital);
router.delete('/:id', validarJWT, eliminarHospital);
router.get('/', obtenerHospitales);

module.exports = router;