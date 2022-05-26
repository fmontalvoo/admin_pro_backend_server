const Hospital = require('../models/hospital.model');

const crearHospital = async (req, res) => {
    try {
        return res.status(200).json({
            message: 'Crear'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const leerHospital = async (req, res) => {
    try {
        return res.status(200).json({
            message: 'Leer'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const actualizarHospital = async (req, res) => {
    try {
        return res.status(200).json({
            message: 'Actualizar'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const eliminarHospital = async (req, res) => {
    try {
        return res.status(200).json({
            message: 'Eliminar'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const obtenerHospitales = async (req, res) => {
    try {
        return res.status(200).json({
            message: 'Listar'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    crearHospital,
    leerHospital,
    actualizarHospital,
    eliminarHospital,
    obtenerHospitales
};