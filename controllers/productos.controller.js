const { response, request } = require("express")
const {Producto} = require('../models/index.model');


const obtenerProducto = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const producto =await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre');
        res.json({ producto });
    } catch (err) {
        res.status(400).json({
            err,
            msg:'Error'
        })
    }
}

const obtenerProductos = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    try {
        const [total, productos] = await Promise.allSettled([
            Producto.countDocuments({ estado: true }),
            Producto.find({ estado: true })
                .populate('usuario','nombre')
                .populate('categoria','nombre')
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.json({
            total:total.value,
            productos:productos.value
        })
    } catch (error) {
        res.status(400).json({
            error,
            msg:'Existe un error'
        })        
    }
}

const crearProducto = async(req=request,res=response) => {
    const {estado, usuario, ...data } = req.body;
    const productoDB = await Producto.findOne({nombre:data.nombre})
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        });
    }
    const dataProducto = {
        ...data,
        nombre: data.nombre.toUpperCase(),
        usuario:req.usuario._id
    }
    const producto = new Producto(dataProducto);
    await producto.save();
    res.json(producto)
}
const actualizarProducto = async(req=request,res=response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    try {
        const producto = await Producto.findByIdAndUpdate(id, data, { new: true })
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');
        res.json({ producto });
    } catch (err) {
        res.status(400).json({
            err,
            msg:'Error'
        })
    }
}
const borrarProducto = async(req=request,res=response) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');
        res.json({ producto });
    } catch (err) {
        res.status(400).json({
            err,
            msg:'Error'
        })
    }
}


module.exports = {
    obtenerProducto,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto
}