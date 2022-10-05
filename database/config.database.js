const mongoose = require('mongoose');

/*const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('conexion establecida');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}*/


mongoose.connect(process.env.MONGODB_CNN)
    .then(() => console.log('conexion establecida'))
    .catch(err => console.log('conexion fallida con la base de datos', err));



//module.exports = {
//    dbConnection
//};
