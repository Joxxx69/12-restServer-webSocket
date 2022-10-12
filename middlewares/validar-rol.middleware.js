const { response, request } = require("express")

// Middleware que verifica solo un rol
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

//Middleware que recive argumentos para poder validar varios roles
const tieneRole = (...roles) => {
    return (req=request,res = response,next) => {
        console.log(roles,'ROLES 2')
        if (!req.usuario) {
            req.statusError=500;
            return next({msg:'Se quiere verificar el rol sin validar el token primero'})
        }
        if (!roles.includes(req.usuario.rol)) {
            req.statusError = 401;
            return next({msg:`El servicio require uno de estos roles ${roles}`})
        }
    
        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}