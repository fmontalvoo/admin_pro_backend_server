const Usuario = require('../models/usuario.model');


const crearUsuario = async (req, res) => {
    const data = req.body;

    const usuario = new Usuario(data);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}

const obtenerUsuarios = (req, res) => {
    res.status(200).json({
        msg: 'Usuarios'
    });
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
};