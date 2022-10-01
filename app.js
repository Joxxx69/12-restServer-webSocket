require('dotenv').config();


const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;



//Midlewear
app.use(cors());
app.use(express.json()); // permite recibir parametros en formato JSON
app.use(express.static('public'));

//Routes - curry
require('./routes/usuarios.routes')(app);
/*const server = require('./routes/server.routes');
server(app);*/




app.listen(port, () => {
    console.log(`conexion establecida en el puerto ${port}`);
});


