require('dotenv').config();
//const {dbConnection} = require('./database/config.database');


const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;

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

//Routes - curry
require('./routes/usuarios.routes')(app);
app.use('/api/auth', require('./routes/auth.routes'));
/*const server = require('./routes/server.routes');
server(app);*/




app.listen(port, () => {
    console.log(`conexion establecida en el puerto ${port}`);
});


