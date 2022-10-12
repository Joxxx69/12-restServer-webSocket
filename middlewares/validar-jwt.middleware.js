const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const validarJWT = async (req=request,res=response,next) => {
    console.log('validar JWT');
    const token = req.header('x-token');
    if (!token) {
        req.statusError = 401;
       return next({ msg: 'No hay token en la peticion' });
    }
    try {
        const {uid} = jwt.verify(token, process.env.PRIVATEKEY);
        req.uid = uid; // establesco por referencia un request
        // esta request estara disponibles para los demas middlewares de la pila
        // apartir de este a los sucesores
        // se puede obtener en los controladores y en los middlewares de error
        const usuario = await Usuario.findById({ _id: uid })
        if (!usuario) {
            req.statusError = 401;
            return next({msg:'Token no valido - usuario no existente DB'});
        }
        if (!usuario.estado) {
            req.statusError = 401;
            return next({msg:'Token no valido - usuario con estado: false'});
        }
        req.usuario = usuario;
        next();
    } catch (err) {
        req.statusError = 401;
        next({msg:'Token no valido'});
    }
}

module.exports = {
    validarJWT
}