//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Genero controller para los métodos definidos
const incidenciaController = require("../controllers/incidenciaController");

//Definición de rutas para incidencia
router.get("/", incidenciaController.get);

router.post('/', incidenciaController.create); 

router.post('/', incidenciaController.createByUser); 


router.get("/:id", incidenciaController.getById);

router.put('/:id', incidenciaController.update);

module.exports = router;