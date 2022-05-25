const Usuario = require('../models/usuario.model');
const { validationResult } = require('express-validator');

const crearUsuario = async (req, res) => {
    try {
        const data = req.body;

        const usuario = new Usuario(data);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        await usuario.save()
            .then(() => {
                res.status(200).json({
                    usuario
                });
            })
            .catch(error => {
                res.status(409).json({
                    message: error.message
                });
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

        await Usuario.findById(id, 'name email role google')
            .then(usuario => {
                res.status(200).json({
                    usuario
                });
            })
            .catch(error => {
                res.status(404).json({
                    message: error.message
                });
            });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const obtenerUsuarios = async (req, res) => {
    try {
        await Usuario.find({}, 'name email role google')
            .then(usuarios => {
                res.status(200).json({
                    usuarios
                });
            })
            .catch(error => {
                res.status(404).json({
                    message: error.message
                });
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