require('dotenv').config();
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use('/', (req, res) => {
    res.status(200).json({ msg: 'Hello World' });
});

app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});
