const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        unique:true,
        required: [true, 'El correo es obligatorio'],
    },
    password: {
        type: String,
        minlength:6,
        required: [true, 'La contrasena es obligatoria'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });





//const Usuario = mongoose.model('Usuario', usuarioSchema);
const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;

