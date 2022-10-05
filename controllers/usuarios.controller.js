const { request, response } = require("express");

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


const usuariosPost = (req = request, res = response) => {
    const {name,age} = req.body;
    res.status(201).json({
        name,
        age,
        msg:'post API'
    });
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