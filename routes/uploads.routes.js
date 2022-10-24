const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos, errorHandler, validarArchivoSubir } = require('../middlewares/index.middleware');
const { cargarArchivo, actualizarImg, mostrarImagen, actualizarImgCloudinary } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/db-validator.helpers');
const router = Router();

router.post('/charge/archive', [
    validarArchivoSubir,
], cargarArchivo, [
    errorHandler
]);
router.put('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    validarArchivoSubir,
    check('coleccion').custom(coleccion=>coleccionesPermitidas(coleccion,['usuarios','productos'])),
    validarCampos
], actualizarImgCloudinary, [
    errorHandler
]);

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(coleccion=>coleccionesPermitidas(coleccion,['usuarios','productos'])),
    validarCampos
], mostrarImagen, [
    errorHandler
]);



module.exports = router;