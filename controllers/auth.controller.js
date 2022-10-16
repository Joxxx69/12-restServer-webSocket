const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const jw = require('jsonwebtoken');
const { generarJWT } = require("../helpers/generarJWT.helpers");

const Login = async (req = request, res = response) => {
    const {correo, password} = req.body;
    try {
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - Correo'
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Estado'
        });
        }
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });            
        }

        const token = await generarJWT(usuario.id);
        console.log(token, 'generacion');


        res.json({
            msg: 'auth ok',
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'hable con el administrador'});
    }
}


const googleSignIn = async (req=request,res=response) => {
    const { id_token } = req.body;
    const token = req.header('x-token');
    
    res.json({
        msg: 'Todo bien',
        id_token,
        token
    })
}

module.exports = {
    Login,
    googleSignIn
}




