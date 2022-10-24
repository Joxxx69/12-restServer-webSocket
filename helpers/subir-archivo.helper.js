const { } = require('../helpers/index.helper');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


const subirArchivo = (files, extensionesEnv ,carpeta='') => {

    return new Promise((resolve, reject) => {
        
        const { archive } = files;
        const nombreCortado = archive.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        let extensionesValidas = extensionesEnv ?? ['png', 'jpg', 'jpeg', 'gif'];
        
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, ${extensionesValidas}`);
        }   
        const nombreTemp = uuidv4() + '.' + extension;
        
        const uploadPath = path.join(__dirname, '../uploads',carpeta, nombreTemp);
        
        archive.mv(uploadPath)
        .then(()=>resolve(nombreTemp))
        .catch(err=> reject(err))
    })
}


module.exports = {
    subirArchivo
}