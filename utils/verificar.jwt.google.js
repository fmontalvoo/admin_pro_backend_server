const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID_WEB = process.env.GOOGLE_ID;

const client = new OAuth2Client(CLIENT_ID_WEB);

async function verificarJWTGoogle(token) {

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [CLIENT_ID_WEB],
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        return {
            email,
            name,
            picture,
        };

    } catch (error) {
        return null;
    }
}

module.exports = { verificarJWTGoogle };