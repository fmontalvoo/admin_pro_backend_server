const Doctor = require('../models/doctor.model');

const crearDoctor = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Crear'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const leerDoctor = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Leer'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const actualizarDoctor = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Actualizar'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const eliminarDoctor = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Eliminar'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const obtenerDoctores = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Listar'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    crearDoctor,
    leerDoctor,
    actualizarDoctor,
    eliminarDoctor,
    obtenerDoctores
};