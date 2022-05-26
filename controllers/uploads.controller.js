const fs = require('fs');

const { v4: uuid } = require('uuid');

const Doctor = require('../models/doctor.model');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');

const actualizarRegistro = async (collection, id, name) => {


    switch (collection) {
        case 'doctores':
            const doctor = await Doctor.findById(id);
            if (!doctor)
                return false;

            const previusPath = `./uploads/${collection}/${doctor.image}`;

            if (fs.existsSync(previusPath))
                fs.unlinkSync(previusPath);

            doctor.image = name;
            await doctor.save();

            return true;

            break;
        case 'usuarios':
            break;
        case 'hospitales':
            break;

    }

}

const uploadFile = async (req, res) => {
    try {
        const { id, collection } = req.params;

        const collections = ['doctores', 'usuarios', 'hospitales'];
        const validExtensions = ['png', 'jpeg', 'jpg'];

        if (!collections.includes(collection))
            return res.status(400).json({
                message: 'La colección no existe'
            });

        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send('No se ha seleccionado ningún archivo');

        const file = req.files.image;

        const extension = file.name.split('.').pop();

        if (!validExtensions.includes(extension))
            return res.status(400).send('Extensión no válida');

        const fileName = `${uuid()}.${extension}`;

        const uploadPath = `./uploads/${collection}/${fileName}`;

        file.mv(uploadPath, function (error) {
            if (error)
                return res.status(500).json({ message: error.message });

            actualizarRegistro(collection, id, fileName);

            return res.status(200).json({
                message: 'Archivo subido correctamente',
                fileName: fileName
            });
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { uploadFile };