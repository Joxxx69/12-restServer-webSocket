const express = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT, errorHandler, esAdminRole } = require('../middlewares/index.middleware');
const controller = require('../controllers/categorias.controller');
const { existeCategoriaPorId } = require('../helpers/db-validator.helpers');

module.exports = function (app=express()) {
    //Obtner todas las categorias - Publico
    app.get('/api/categorias',controller.obtenerCategorias);

    // Obtener una categoria por ID - Publico
    app.get('/api/categoria/:id', [
        check('id','No es un id de MongoDB valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ], controller.obtenerCategoria, [
        errorHandler
    ]);

    //Crear categoria - Privado - cualquier persona con un token valido
    app.post('/api/crear/categoria', [
        validarJWT,
        check('nombre','El nombre es obligatorio').notEmpty(),
        validarCampos        
    ], controller.crearCategoria, [
        errorHandler
    ]);

    //Actualizar Categoria - Privado - cualquiera con un token valido
    app.put('/api/actualizar/categoria/:id', [
        validarJWT,
        check('nombre','El nombre es obligatorio').notEmpty(),
        check('id', 'No es un id de MongoDB valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
       validarCampos 
    ], controller.actualizarCategoria, [
        errorHandler
    ]);

    //Eliminar Categoria - Admin

    app.delete('/api/eliminar/categoria/:id', [
        validarJWT,
        esAdminRole,
        check('id', 'No es un id de MongoDB valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ], controller.borrarCategoria, [
        errorHandler
    ]);
}
