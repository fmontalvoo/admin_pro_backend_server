require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connection } = require('./database/config');

const app = express();
connection();

const port = process.env.PORT || 3000;

// Cross-origin
app.use(cors());
// Serializacion
app.use(express.json());

app.use('/', (req, res) => {
    res.status(200).json({ msg: 'Hello World' });
});

app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});
