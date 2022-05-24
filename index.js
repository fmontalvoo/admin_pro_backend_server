require('dotenv').config();
const express = require('express');

const { connection } = require('./database/config');

const app = express();
connection();

const port = process.env.PORT || 3000;

app.use('/', (req, res) => {
    res.status(200).json({ msg: 'Hello World' });
});

app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});
