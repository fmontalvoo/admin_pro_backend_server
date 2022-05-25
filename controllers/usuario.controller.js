const Usuario = require('../models/usuario.model');


const crearUsuario = async (req, res) => {
    const data = req.body;

    const usuario = new Usuario(data);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}

const leerUsuario = async (req, res) => {
    const id = req.params.id;

    const usuario = await Usuario.findById(id, 'name email role google');

    res.status(200).json({
        usuario
    });
}

const obtenerUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'name email role google');

    res.status(200).json({
        usuarios
    });
}

module.exports = {
    crearUsuario,
    leerUsuario,
    obtenerUsuarios,
};