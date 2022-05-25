const Usuario = require('../models/usuario.model');


const crearUsuario = async (req, res) => {
    try {
        const data = req.body;

        const usuario = new Usuario(data);

        await usuario.save();

        res.status(200).json({
            usuario
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const leerUsuario = async (req, res) => {
    try {
        const id = req.params.id;

        const usuario = await Usuario.findById(id, 'name email role google');

        res.status(200).json({
            usuario
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, 'name email role google');

        res.status(200).json({
            usuarios
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    crearUsuario,
    leerUsuario,
    obtenerUsuarios,
};