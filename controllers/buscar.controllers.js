const { request, response } = require("express");
const { Usuario, Categoria, Producto } = require("../models/index.model");
const {ObjectId} = require('mongoose').Types;
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '',res=response) => {
    //return async( res = response) => {
        const esMongoID = ObjectId.isValid(termino);
        if (esMongoID) {
            const usuario = await Usuario.findById(termino);
            return  res.json({
                resultados:(usuario)?[usuario]:[]
            });
        }
        const usuarios = await Usuario.find({
            $or: [
                { nombre: { $regex: termino, $options: 'i' } },
                { correo: { $regex: termino, $options: 'i' } }
            ],
            $and:[{estado:true}]
            
        });
        res.json({
            resultados: usuarios
        });
    //}
}
const buscarCategorias = async (termino = '',res=response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const categoria = await Categoria.findById(termino)
            .populate('usuario', 'nombre');
        return  res.json({
            resultados:(categoria)?[categoria]:[]
        });
    }
    const categorias = await Categoria.find({ nombre: { $regex: termino, $options: 'i' }, estado: true })
        .populate('usuario', 'nombre');
    res.json({
        resultados: categorias
    });
}
const buscarProducto = async (termino = '',res=response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const producto = await Producto.findById(termino)
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre');
        return  res.json({
            resultados:(producto)?[producto]:[]
        });
    }
    const productos = await Producto.find({ nombre: { $regex: termino, $options: 'i' }, estado: true })
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre');
    res.json({
        resultados: productos
    });

}


const buscar = async (req = request, res = response) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }
    const key = {
        usuarios:()=>buscarUsuarios(termino, res),
        categorias: ()=>buscarCategorias(termino, res),
        productos:()=>buscarProducto(termino,res),
    }
    return key[coleccion]();
    
}


module.exports = {
    buscar
}