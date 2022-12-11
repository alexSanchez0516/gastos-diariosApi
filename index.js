const express = require('express');
const cors = require('cors');
const {dbConnect} = require("./databases/config");
require('dotenv').config();

// Crear servidor express
const app = express();

//DB
dbConnect();

// Directorio publico
app.use( express.static('public'));

//cors
app.use(cors());


// Lectura y parseo del body (Middleware)
app.use( express.json() );

// rutas
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/app', require('./routes/gastosApp') );

app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en tl puerto 4000');
});
