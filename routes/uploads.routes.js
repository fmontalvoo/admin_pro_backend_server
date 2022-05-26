const { Router } = require('express');

const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt.middleware');

const { uploadFile } = require('../controllers/uploads.controller');

const router = new Router();

router.use(fileUpload());

router.put('/:collection/:id', validarJWT, uploadFile);

module.exports = router;