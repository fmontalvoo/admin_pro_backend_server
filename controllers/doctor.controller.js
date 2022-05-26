const Doctor = require('../models/doctor.model');

const crearDoctor = async (req, res) => {
    try {
        const uid = req.uid;
        const data = req.body;

        const doctor = new Doctor({ user: uid, ...data });

        await doctor.save()
            .then(() => {
                return res.status(200).json({
                    doctor
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

const leerDoctor = async (req, res) => {
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

const actualizarDoctor = async (req, res) => {
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
const eliminarDoctor = async (req, res) => {
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

const obtenerDoctores = async (req, res) => {
    try {
        await Doctor.find()
            .populate('user', 'name email image')
            .populate('hospital', 'name image')
            .then(doctores => {
                return res.status(200).json({
                    doctores
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
    crearDoctor,
    leerDoctor,
    actualizarDoctor,
    eliminarDoctor,
    obtenerDoctores
};