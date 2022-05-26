const Hospital = require('../models/hospital.model');

const crearHospital = async (req, res) => {
    try {

        const uid = req.uid;
        const data = req.body;

        const hospital = new Hospital({ user: uid, ...data });

        await hospital.save()
            .then(() => {
                return res.status(200).json({
                    hospital
                });
            })
            .catch(error => {
                return res.status(409).json({
                    message: error.message
                });
            });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
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
        });
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
        });
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
        });
    }
}

const obtenerHospitales = async (req, res) => {
    try {
        await Hospital.find()
            .populate('user', 'name email image')
            .then(hospitales => {
                return res.status(200).json({
                    hospitales
                });
            })
            .catch(error => {
                return res.status(404).json({
                    message: error.message
                });
            });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    crearHospital,
    leerHospital,
    actualizarHospital,
    eliminarHospital,
    obtenerHospitales
};