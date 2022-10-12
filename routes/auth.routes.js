const { Router } = require('express');
const { check } = require('express-validator');
const controller = require('../controllers/auth.controller');
const {validarCampos} = require('../middlewares/campos.middleware');
const {errorHandler } = require('../middlewares/errorhandler.middleware');
const { validarJWT } = require('../middlewares/validar-jwt.middleware');

const router = Router();


// Aqui ocupo middlewares a nivel de Router

router.post('/post/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
], controller.Login, [
    errorHandler
]);





module.exports = router;







