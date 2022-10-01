const express = require('express');
const controller = require('../controllers/usuarios.controller');

module.exports = function (app=express()) {
    app.get('/api/usuarios/get',controller.usuariosGet);
    app.put('/api/usuarios/put/:id', controller.usuariosPut);
    app.post('/api/usuarios/post', controller.usuariosPost);
    app.delete('/api/usuarios/delete', controller.usuariosDelete);
}