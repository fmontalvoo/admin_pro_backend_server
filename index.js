require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connection } = require('./database/config');

const app = express();
connection();

const port = process.env.PORT || 3000;
const path = '/api/v1';

// Cross-origin
app.use(cors());
// Serializacion
app.use(express.json());

// Rutas
app.use(`${path}/auth`, require('./routes/auth.routes'));
app.use(`${path}/doctores`, require('./routes/doctor.routes'));
app.use(`${path}/usuarios`, require('./routes/usuario.routes'));
app.use(`${path}/hospitales`, require('./routes/hospital.routes'));

app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});
