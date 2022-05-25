const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token)
        return res.status(401).json({
            message: 'No tiene permisos para acceder'
        });
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token no valido'
        });
    }
}

module.exports = { validarJWT };