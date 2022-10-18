const express = require('express');
const { check } = require('express-validator');
const controller = require('../controllers/buscar.controllers');
const { errorHandler } = require('../middlewares/index.middleware');

module.exports = function (app=express() ) {
    app.get('/api/busquedas/:coleccion/:termino', [
    ],controller.buscar, [
       errorHandler 
    ]);
}