const dotEnv = require('dotenv');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const prism = new PrismaClient();


//---Archivos de rutas---//
const rubroRouter = require("./routes/rubroRoutes");
const planRouter = require("./routes/planRoutes");
//const residenciaRouter = require("./routes/residenciaRoutes");



// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puero que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());  
// Middleware para loggear las llamadas al servidor
app.use(logger('dev'));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//---- Definir rutas ----
app.use("/rubro/", rubroRouter);
app.use("/plan/", rubroRouter);

//app.use("/residencia/", residenciaRouter);


// Servidor
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.log('Presione CTRL-C para deternerlo\n');
  });