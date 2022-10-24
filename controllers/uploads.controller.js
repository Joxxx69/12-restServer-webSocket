const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL)
const { request, response } = require("express");
const { subirArchivo } = require("../helpers/index.helper");
const { Producto, Usuario } = require('../models/index.model');

const cargarArchivo = async(req = request, res = response) => {
    if (!req.files || Object.keys(req.files).length ===0 || !req.files.archive) {
        return res.status(400).json({msg:'No hay archivos que subir'});
    } 
    
    //Imagenes
    try {
        //const nombre = await subirArchivo(req.files,['txt','md'],'textos');
        const nombre = await subirArchivo(req.files,undefined,'imgs');
        res.json({nombre})
    } catch (error) {
        res.status(400).json({msg:error});        
    }
    
    
}




const actualizarImg = async(req=request, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;
    try {
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({msg:'Me olvide validar esto '})
    }

        //limpiar imagenes previas
        if (modelo.img) {
            //hay que borra la imagen del servidor
            const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImg)) { // verifica si existe un archivo mediante el path enviado
                fs.unlinkSync(pathImg); // borra archivo, mandando un path
            }

        }
        
        const nombre = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = nombre;
        await modelo.save();
        res.json(modelo)
    } catch (error) {
        console.log('estamos en el error');
        res.status(500).json({msg:error})        
    }
}

const actualizarImgCloudinary = async(req=request, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;
    try {
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({msg:'Me olvide validar esto '})
    }

        //limpiar imagenes previas
        if (modelo.img) {
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            await cloudinary.uploader.destroy(public_id);
        }

        const { tempFilePath} = req.files.archive;
        
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        modelo.img = secure_url;
        await modelo.save();
        res.json(modelo)
    } catch (error) {
        console.log('estamos en el error');
        res.status(500).json({msg:error})        
    }
}


const mostrarImagen = async(req=request,res=response,next) => {
    const { coleccion, id } = req.params;
    let modelo;
    try {
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({msg:'Me olvide validar esto '})
    }

        //limpiar imagenes previas
        if (modelo.img) {
            //hay que borra la imagen del servidor
            const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImg)) { // verifica si existe un archivo mediante el path enviado
                 return res.sendFile(pathImg);
            }
        }
        const pathImg = path.join(__dirname, '../assets','reptar.jpg');
        res.sendFile(pathImg); 

    } catch (error) {
        res.status(500).json({msg:error})        
    }
}


//const actualizarImg = async (req=request,res=response) => {
//    let { coleccion, id } = req.params;
//    if (!['usuarios','productos'].includes(coleccion)) {
//        coleccion = 'defaultKey';
//    }
//    const nombre = await subirArchivo(req.files, undefined, coleccion);
    
//    const key = {
//        usuarios:  ()=>  {
//            Usuario.findById(id)
//                .then(async(usuario)=> {
//                    if (!usuario) throw `No existe un usuario con el id ${id}`;
//                    usuario.img = nombre;
//                    try {
//                        await usuario.save();
//                    } catch (err) {
//                        throw `No existe un error ${err}`;
//                    }
//                    res.json(usuario);
//                })
//                .catch(err => res.status(400).json({ msg: err }));
//        },
//        productos: () => {
//            Producto.findById(id)  
//                .then(async(producto) => {
//                    if (!producto) throw `No existe un producto con el id ${id}`;
//                    producto.img = nombre;
//                    try {
//                        await producto.save();
//                    } catch (err) {
//                        throw `No existe un error ${err}`;
//                    }                    res.json(producto);
//                })
//                .catch(err => res.status(400).json({ msg: err }));
//        },
//        defaultKey:()=> res.status(500).json({msg:'Se me olvido validar esto'})
//    }
//        key[coleccion]();
//}

module.exports = {
    cargarArchivo,
    actualizarImg,
    mostrarImagen,
    actualizarImgCloudinary
}

//nike2013#100292