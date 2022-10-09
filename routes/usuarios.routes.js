const express = require('express');
const { check } = require('express-validator');
const controller = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/campos.middleware');
const { errorHandler } = require('../middlewares/errorhandler.middleware');

module.exports = function (app=express()) {
    app.get('/api/usuarios/get',controller.usuariosGet);
    app.put('/api/usuarios/put/:id', controller.usuariosPut);
    app.post('/api/usuarios/post', [
        check('nombre','El nombre es obligatorio').notEmpty(),
        check('correo', 'El correo no es valido').isEmail(),
        check('password', 'El password debe de ser de mas de 6 letras').isLength({ min: 6 }),
        check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validarCampos
    ], controller.usuariosPost, [
        errorHandler
    ]);
    app.delete('/api/usuarios/delete', controller.usuariosDelete);


}