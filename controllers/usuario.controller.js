const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../utils/jwt');

const crearUsuario = async (req, res) => {
    try {
        const data = req.body;

        const usuario = new Usuario(data);

        // Encriptar contraseña
        const { password } = data;
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save()
            .then(async () => {
                const token = await generarJWT(usuario.id);
                res.status(200).json({
                    usuario,
                    token
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
                if (!(!!usuario))
                    res.status(404).json({
                        message: 'Usuario no encontrado'
                    });
                else
                    res.status(200).json({
                        usuario
                    });
            })
            .catch(error => {
                res.status(400).json({
                    message: error.message
                });
            });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const actualizarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const { password, google, ...usuario } = data;

        await Usuario.findByIdAndUpdate(id, usuario, { new: true })
            .then(usuario => {
                if (!!!usuario)
                    res.status(404).json({
                        message: 'Usuario no encontrado'
                    });
                else
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

const eliminarUsuario = async (req, res) => {
    try {
        const id = req.params.id;

        await Usuario.findByIdAndDelete(id)
            .then(usuario => {
                if (!(!!usuario))
                    res.status(404).json({
                        message: 'Usuario no encontrado'
                    });
                else
                    res.status(200).json({
                        usuario
                    });
            })
            .catch(error => {
                res.status(400).json({
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
    actualizarUsuario,
    eliminarUsuario,
    obtenerUsuarios,
};