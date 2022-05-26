const Doctor = require('../models/doctor.model');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');

const search = async (req, res) => {
    try {
        const query = req.query.q || '';
        const regex = new RegExp(query, 'i');

        await Promise.all([
            Doctor.find({ name: regex }),
            Usuario.find({ name: regex }),
            Hospital.find({ name: regex })
        ])
            .then(
                ([doctores, usuarios, hospitales]) => res.status(200).json({ doctores, usuarios, hospitales })
            )
            .catch(
                error => res.status(500).json({ message: error.message })
            );

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const searchInCollection = async (req, res) => {
    try {
        const query = req.query.q || '';
        const collection = req.params.collection;
        const regex = new RegExp(query, 'i');

        let response;

        switch (collection) {
            case 'doctores':
                response = Doctor.find({ name: regex });
                break;
            case 'usuarios':
                response = Usuario.find({ name: regex });
                break;
            case 'hospitales':
                response = Hospital.find({ name: regex });
                break;
            default:
                return res.status(404).json({
                    message: 'La colección no existe'
                });
        }

        return response
            .then(
                resultados => res.status(200).json({ resultados })
            )
            .catch(
                error => res.status(500).json({ message: error.message })
            );

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { search, searchInCollection };