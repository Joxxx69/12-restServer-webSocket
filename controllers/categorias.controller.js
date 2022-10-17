const { response, request } = require("express")
const {Categoria} = require('../models/index.model');


const crearCategoria = async(req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne()
    if (categoriaDB) {
        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre}, ya existe`
        })
    }
    const data = {
        nombre,
        usuario: req.usuario._id
    };
    const categoria = new Categoria(data);
    await categoria.save();
    
    res.json('crear Categoria')
}

const obtenerCategorias = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    try {
        const [total, categorias] = await Promise.allSettled([
            Categoria.countDocuments({ estado: true }),
            Categoria.find({ estado: true })
                .populate('usuario','nombre')
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.json({
            total:total.value,
            categorias:categorias.value
        })
    } catch (error) {
        res.status(400).json({
            error,
            msg:'Existe un error'
        })        
    }
}

const obtenerCategoria = async(req=request,res=response) => {
    const { id } = req.params;
    try {
        const categoria =await Categoria.findById(id).populate('usuario','nombre');
        res.json({ categoria });
    } catch (err) {
        res.status(400).json({
            err,
            msg:'Error'
        })
    }
}
const actualizarCategoria = async(req=request,res=response) => {
    const { id } = req.params;
    const {estado, usuario,...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;


    try {
        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true })
            .populate('usuario', 'nombre');
        res.json({ categoria });
    } catch (err) {
        res.status(400).json({
            err,
            msg:'Error'
        })
    }
}
const borrarCategoria = async(req=request,res=response) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })
            .populate('usuario', 'nombre');
        res.json({ categoria });
    } catch (err) {
        res.status(400).json({
            err,
            msg:'Error'
        })
    }
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}