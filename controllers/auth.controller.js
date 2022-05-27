const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');

const { generarJWT } = require('../utils/jwt');
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
                            token
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
    const token = req.body.token;
    if (!token) return res.status(401).json({
        message: 'No existe el token'
    });

    const googleAccount = await verificarJWTGoogle(token);

    if (!googleAccount)
        return res.status(401).json({
            message: 'La cuenta de google no es valida'
        });

    console.info('google account: ', googleAccount);

    return res.status(200).json(googleAccount);
}

module.exports = {
    login,
    loginWithGoogle
};