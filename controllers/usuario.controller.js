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
                return res.status(200).json({
                    usuario,
                    token
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

const leerUsuario = async (req, res) => {
    try {
        const id = req.params.id;

        await Usuario.findById(id, 'name email role google')
            .then(usuario => {
                if (!(!!usuario))
                    return res.status(404).json({
                        message: 'Usuario no encontrado'
                    });
                else
                    return res.status(200).json({
                        usuario
                    });
            })
            .catch(error => {
                return res.status(400).json({
                    message: error.message
                });
            });
    } catch (error) {
        return res.status(500).json({
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
                    return res.status(404).json({
                        message: 'Usuario no encontrado'
                    });
                else
                    return res.status(200).json({
                        usuario
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

const eliminarUsuario = async (req, res) => {
    try {
        const id = req.params.id;

        await Usuario.findByIdAndDelete(id)
            .then(usuario => {
                if (!(!!usuario))
                    return res.status(404).json({
                        message: 'Usuario no encontrado'
                    });
                else
                    return res.status(200).json({
                        usuario
                    });
            })
            .catch(error => {
                return res.status(400).json({
                    message: error.message
                });
            });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const obtenerUsuarios = async (req, res) => {
    try {

        const from = Number(req.query.from) || 0;
        const limit = Number(req.query.limit) || 5;

        await Promise.all([
            Usuario.find({}, 'name email role google')
                .skip(from)
                .limit(limit),
            Usuario.count()
        ])
            .then(async ([usuarios, total]) => {
                return res.status(200).json({
                    usuarios,
                    total
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
    crearUsuario,
    leerUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerUsuarios,
};