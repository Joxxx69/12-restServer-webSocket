const { Categoria,Role,Usuario } = require("../models/index.model");
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



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
}

