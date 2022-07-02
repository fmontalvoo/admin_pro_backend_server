const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario.model');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token)
        return res.status(401).json({
            message: 'No tiene permisos para acceder'
        });
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        return next();
    } catch (error) {
        return res.status(401).json({
            message: 'No tiene permisos para acceder'
        });
    }
}

const validarAdmin = async (req, res, next) => {
    try {
        const uid = req.uid;
        const usuario = await Usuario.findById(uid);
        if (!(!!usuario))
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });

        if (usuario.role !== 'ADMIN_ROLE')
            return res.status(403).json({
                message: 'No tiene permisos para acceder'
            });

        return next();

    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
}

const validarAdminOrSelf = async (req, res, next) => {
    try {
        const uid = req.uid;
        const id = req.params.id;

        const usuario = await Usuario.findById(uid);

        if (!(!!usuario))
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });

        if (usuario.role === 'ADMIN_ROLE' || uid === id)
            return next();

        return res.status(403).json({
            message: 'No tiene permisos para acceder'
        });


    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        });
    }
}

module.exports = {
    validarJWT,
    validarAdmin,
    validarAdminOrSelf,
};