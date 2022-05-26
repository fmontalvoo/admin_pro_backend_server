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

module.exports = { search };