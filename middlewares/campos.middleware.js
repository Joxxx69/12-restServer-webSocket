const { validationResult } = require('express-validator');



const validarCampos = (req,res, next) => {
    const listaErrores = validationResult(req);
    if (!listaErrores.isEmpty()) {
        next(listaErrores);
    }
    next();
}

module.exports = {
    validarCampos
}