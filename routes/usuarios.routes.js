const express = require('express');
const { check } = require('express-validator');
const controller = require('../controllers/usuarios.controller');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator.helpers');
//const { errorHandler } = require('../middlewares/error-handler.middleware');
const { validarCampos, validarJWT, tieneRole, errorHandler } = require('../middlewares/index.middleware');


// aqui ocupo middlewares a nivel de ruta

module.exports = function (app=express()) {
    app.get('/api/usuarios/get',controller.obtenerUsuarios);
    app.put('/api/usuarios/put/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRolValido),
        validarCampos
    ], controller.actualizarUsuario, [
        errorHandler
    ]);
    app.post('/api/usuarios/post', [
        check('nombre','El nombre es obligatorio').notEmpty(),
        check('correo', 'El correo no es valido').isEmail(),
        check('password', 'El password debe de ser de mas de 6 letras').isLength({ min: 6 }),
        //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        //check('rol').custom((rol)=>esRolValido(rol)),
        check('rol').custom(esRolValido),
        check('correo').custom(emailExiste),
        validarCampos
    ], controller.crearUsuario, [
        errorHandler
    ]);
    app.delete('/api/usuarios/delete/:id', [
        validarJWT,
        tieneRole('ADMIN_ROLE','VENTAS_ROLE','USER_ROLE'),
        check('id','No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
    ], controller.eliminarUsuario, [
        errorHandler
    ]);


}