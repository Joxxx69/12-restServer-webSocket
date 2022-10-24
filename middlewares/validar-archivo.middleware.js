const { request, response } = require("express");



const validarArchivoSubir = (req=request,res=response,next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archive) {
        req.statusError = 400;
        return next({msg:'No hay archivos que subir - validarArchivoSubir'});
    } 
    next();
}


module.exports = {
    validarArchivoSubir
}