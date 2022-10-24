const dbValidators  = require('./db-validator.helpers');
const generarJWT  = require('./generarJWT.helpers');
const googleVerify  = require('./google.helper');
const subirArchivo  = require('./subir-archivo.helper');

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}