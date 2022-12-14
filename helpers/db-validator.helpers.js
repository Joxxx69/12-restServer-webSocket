const { Categoria,Role,Usuario, Producto } = require("../models/index.model");
//const Role = require("../models/rol.model");
//const Usuario = require("../models/usuario.model");

const esRolValido = async (rol='') => {
    const existeRol = await Role.findOne({rol});//El campo debe coincidir con el del Schema
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
    return true;
}
const emailExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({ correo: email });
    if (existeEmail) {
        throw new Error(`Ese correo: ${email} ya esta registrado`);
    }
    return true;
}
const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
    return true;
}
const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
    return true;
}
const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }
    return true;
}

const coleccionesPermitidas = (coleccion='',colecciones=[]) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${ colecciones}`);
    }
    return true;
}



module.exports = {
    esRolValido,
    emailExiste,
    coleccionesPermitidas,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}

