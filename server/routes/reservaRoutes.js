//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Genero controller para los métodos definidos
const reservaController = require("../controllers/reservaController");

//Definición de rutas para incidencia
router.get("/", reservaController.get);

//router.post('/', reservaController.create); 

router.post('/', reservaController.createByUser); 

router.get("/:id", reservaController.getById);

router.put('/:id', reservaController.update);

module.exports = router;