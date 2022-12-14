require('dotenv').config();
//const {dbConnection} = require('./database/config.database');

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;
const fileUpload = require('express-fileupload');

//Data Base

require('./database/config.database')

//-1- forma
/*
(async () => {
    await dbConnection();
})();
*/

//-2- forma
/*dbConnection()
    .then(res => console.log('bien', res))
    .catch(err=>console.log('error',err));
*/
//Midlewear a nivel de aplicacion
app.use(cors());
app.use(express.json()); // permite recibir parametros en formato JSON
app.use(express.static('public'));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir: '/tmp/',
    createParentPath:true
}));


// Routes
app.use('/api/auth', require('./routes/auth.routes'));//Routes - Router
app.use('/api/uploads', require('./routes/uploads.routes')); // Routes - Router
app.use('/api/productos',require('./routes/productos.routes'));//Routes - Router
require('./routes/usuarios.routes')(app);//Routes - curry
require('./routes/categorias.routes')(app);//Routes - curry
require('./routes/buscar.routes')(app);//Routes - curry

/*const server = require('./routes/server.routes');
server(app);*/




app.listen(port, () => {
    console.log(`conexion establecida en el puerto ${port}`);
});


