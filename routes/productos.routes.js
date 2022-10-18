const {Router} = require('express');
const router = Router();
const controller = require('../controllers/productos.controller');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validator.helpers');
const { check } = require('express-validator');
const { validarCampos, errorHandler, validarJWT } = require('../middlewares/index.middleware');

//Obtener todas las categorias
router.get('/obtener',controller.obtenerProductos);

//Obtener un producto de acuerdo el ID
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], controller.obtenerProducto, [
    errorHandler
])

//Crear una categoria 
router.post('/crear', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], controller.crearProducto, [
    errorHandler
]);


//Actualizar una categoria

router.put('/actualizar/:id', [
    validarJWT,
    check('id','No es un id de Mongo').isMongoId(),
    //check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], controller.actualizarProducto, [
    errorHandler
]);

//Eliminar categoria

router.delete('/eliminar/:id', [
    validarJWT,
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], controller.borrarProducto, [
    errorHandler
]);

module.exports = router;