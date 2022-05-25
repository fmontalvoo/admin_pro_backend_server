const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');

const { generarJWT } = require('../utils/jwt');

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        await Usuario.findOne({ email })
            .then(async usuario => {
                if (!!usuario)
                    if (bcrypt.compareSync(password, usuario.password)) {
                        const token = await generarJWT(usuario.id);
                        res.status(200).json({
                            token
                        });
                    }
                res.status(401).json({
                    message: 'Error de credenciales'
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

module.exports = {
    login,
}