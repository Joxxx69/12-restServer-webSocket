const { request, response } = require("express");
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");

//cambios


const usuariosGet = async (req = request, res = response) => {
    let { limite = 5, desde = 0 } = req.query;
    //const usuarios = await Usuario.find()
    //    .skip(Number(desde))
    //    .limit(Number(limite));
    //const total = await Usuario.countDocuments();

    const [usuarios,total] = await Promise.all([
        Usuario.find({estado:true}).skip(Number(desde)).limit(Number(limite)),
        Usuario.countDocuments({estado:true})
    ]);

    res.json({
        total,
        usuarios
    });
}

const actualizarUsuario = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id,password, google,correo, ...resto } = req.body;
    if (password) {
        resto.password = bcryptjs.hashSync(JSON.stringify(password),10);
    } 
    const usuario = await Usuario.findByIdAndUpdate(id,resto,{new:true})
    res.json({usuario});
}
const crearUsuario = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });    
    try {
        usuario.password = await bcrypt.hash(usuario.password, 10);
        await usuario.save();
        res.json({ usuario });
    } catch (error) {
        res.status(400).json({error})
    }
}


const usuariosDelete =(req = request, res= response) => {
    res.json({
        msg:'delete API'
    });
}

module.exports = {
    usuariosGet,
    actualizarUsuario,
    crearUsuario,
    usuariosDelete
}
