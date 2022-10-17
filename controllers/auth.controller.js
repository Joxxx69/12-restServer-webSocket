const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const jw = require('jsonwebtoken');
const { generarJWT } = require("../helpers/generarJWT.helpers");
const { googleVerify } = require("../helpers/google.helper");

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
    const token_id = req.header('x-token');
    try {
        const {nombre,img,correo} = await googleVerify(token_id);
        let usuario = await Usuario.findOne({ correo });
        console.log({usuario});
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: nombre,
                img,
                google: true,
                rol:'USER_ROLE'
            }
            usuario = new Usuario(data);
            await usuario.save();
        }
        if (!usuario.estado) {
            console.log('hable con el administrador, usuario bloqueado');
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            })
        }
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log({error});
        res.status(400).json({
            ok: false,
            msg:'El token no se pudo verificar'
        })
    }
}

module.exports = {
    Login,
    googleSignIn
}




