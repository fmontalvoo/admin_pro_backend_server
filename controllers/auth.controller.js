const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');

const { generarJWT } = require('../utils/jwt');
const { getMenuBuilder } = require('../utils/menu.buillder');
const { verificarJWTGoogle } = require('../utils/verificar.jwt.google');

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        await Usuario.findOne({ email })
            .then(async usuario => {
                if (!!usuario)
                    if (bcrypt.compareSync(password, usuario.password)) {
                        const token = await generarJWT(usuario.id);
                        return res.status(200).json({
                            token,
                            menu: getMenuBuilder(usuario.role)
                        });
                    }
                return res.status(401).json({
                    message: 'Error de credenciales'
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

const loginWithGoogle = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) return res.status(401).json({
            message: 'No existe el token'
        });

        const googleAccount = await verificarJWTGoogle(token);

        if (!googleAccount)
            return res.status(401).json({
                message: 'La cuenta de google no es valida'
            });

        const { email, name, picture } = googleAccount;
        await Usuario.findOne({ email })
            .then(async usr => {
                let nuevoUsuario;
                if (!usr) {
                    // Si no existe el usuario
                    nuevoUsuario = new Usuario({
                        name,
                        email,
                        password: '@@@',
                        image: picture,
                        google: true,
                    });
                } else {
                    // Si existe el usuario
                    nuevoUsuario = usr;
                    nuevoUsuario.google = true;
                }
                await nuevoUsuario.save()
                    .then(async usuario => {
                        const token = await generarJWT(usuario.id);
                        return res.status(200).json({
                            token,
                            menu: getMenuBuilder(usuario.role)
                        });
                    })
                    .catch(error =>
                        res.status(400).json({
                            message: error.message
                        })
                    );

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

const renewToken = async (req, res) => {
    try {
        const id = req.uid;
        const token = await generarJWT(id);
        await Usuario.findById(id)
            .then(usuario => {
                return res.status(200).json({
                    usuario,
                    token,
                    menu: getMenuBuilder(usuario.role)
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

module.exports = {
    login,
    renewToken,
    loginWithGoogle
};