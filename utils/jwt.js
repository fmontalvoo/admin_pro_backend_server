const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        },
            (error, token) => {
                if (error)
                    reject(token);
                else
                    resolve(token);
            });
    });

}

module.exports = { generarJWT }