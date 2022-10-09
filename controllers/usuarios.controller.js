const { request, response } = require("express");
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");

//cambios


const usuariosGet = (req = request, res = response) => {
    const query = req.query;
    //const {q, nombre}=req.query;
    res.json({
        query,
        msg:'get API'
    });
}

const usuariosPut = (req = request, res = response) => {
    const { id } = req.params;
    res.json({
        id,
        msg:'put API'
    });
}


const usuariosPost = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });    
    try {
        const existeEmail = await Usuario.findOne({ correo });
        if (existeEmail) {
            return res.status(400).json({msg:'Ese correo ya esta registrado'})
        }
        usuario.password = await bcrypt.hash(usuario.password, 10);
        await usuario.save();
        res.json({ usuario });
        console.log(usuario);
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
    usuariosPut,
    usuariosPost,
    usuariosDelete
}