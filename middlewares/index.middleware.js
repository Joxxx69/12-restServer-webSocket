const validarCampos = require('../middlewares/validar-campos.middleware');
const validarJWT = require('../middlewares/validar-jwt.middleware');
const validarRoles = require('../middlewares/validar-rol.middleware');
const errorHandler = require('../middlewares/error-handler.middleware');
const validarArchivoSubir = require('../middlewares/validar-archivo.middleware');

module.exports = {
    ...validarRoles,
    ...validarCampos,
    ...validarJWT,
    ...errorHandler,
    ...validarArchivoSubir
};


