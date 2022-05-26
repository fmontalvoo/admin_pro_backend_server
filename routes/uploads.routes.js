const { Router } = require('express');

const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt.middleware');

const { uploadFile, getImage } = require('../controllers/uploads.controller');

const router = new Router();

router.use(fileUpload());

router.put('/:collection/:id', validarJWT, uploadFile);
router.get('/:collection/:img', getImage);

module.exports = router;