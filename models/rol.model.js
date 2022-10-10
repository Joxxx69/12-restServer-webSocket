const mongoose = require('mongoose');



const RoleSchema = new mongoose.Schema({
    rol: {
        type: String,
        required:[true,'El rol es obligatorio']
    }
}, { timestamps: true });


const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;