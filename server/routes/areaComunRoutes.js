//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Genero controller para los métodos definidos
const areaComunController = require("../controllers/areaComunController");

//Definición de rutas para incidencia
router.get("/", areaComunController.get);

router.post('/', areaComunController.create); 

router.get("/:id", areaComunController.getById);

router.put('/:id', areaComunController.update);

module.exports = router;