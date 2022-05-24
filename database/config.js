const mongoose = require('mongoose');

const connection = () => {
    try {
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.info('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}

module.exports = { connection }