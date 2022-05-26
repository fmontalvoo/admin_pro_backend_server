const fs = require('fs');

const { v4: uuid } = require('uuid');

const Doctor = require('../models/doctor.model');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');

const actualizarRegistro = async (collection, id, name) => {

    const path = `./uploads/${collection}`;

    const borrarImagen = (previusPath) => {
        if (fs.existsSync(previusPath))
            fs.unlinkSync(previusPath);//Elimina la imagen.
    }

    switch (collection) {
        case 'doctores':
            const doctor = await Doctor.findById(id);
            if (!doctor)
                return false;

            borrarImagen(`${path}/${doctor.image}`);

            doctor.image = name;
            await doctor.save();

            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario)
                return false;

            borrarImagen(`${path}/${usuario.image}`);

            usuario.image = name;
            await usuario.save();

            return true;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital)
                return false;

            borrarImagen(`${path}/${hospital.image}`);

            hospital.image = name;
            await hospital.save();

            return true;
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