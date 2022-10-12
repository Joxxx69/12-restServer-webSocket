const { response, request } = require("express")


const esAdminRole = (req = request, res = response, next) => {
    console.log('esAdminRole');
    if (!req.usuario) {
        req.statusError=500;
        return next({msg:'Se quiere verificar el rol sin validar el token primero'})
    }
    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        req.statusError = 401;
        return next({msg:`${nombre} no es administrador - No puede hacer esto`});
    }
    
    next();
}


module.exports = {
    esAdminRole
}