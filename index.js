require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { connection } = require('./database/config');

const app = express();
connection();

const port = process.env.PORT || 3000;
const version_path = '/api/v1';

// Cross-origin
app.use(cors());
// Serializacion
app.use(express.json());
// Directorio publico
app.use(express.static('public'));

// Rutas
app.use(`${version_path}/auth`, require('./routes/auth.routes'));
app.use(`${version_path}/search`, require('./routes/busqueda.routes'));
app.use(`${version_path}/uploads`, require('./routes/uploads.routes'));
app.use(`${version_path}/doctores`, require('./routes/doctor.routes'));
app.use(`${version_path}/usuarios`, require('./routes/usuario.routes'));
app.use(`${version_path}/hospitales`, require('./routes/hospital.routes'));

// Servir aplicacion SPA
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
});
