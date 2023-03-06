//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Genero controller para los métodos definidos
const residenciaController = require("../controllers/residenciaController");

//Definición de rutas para residencia
router.get("/", residenciaController.get);

router.post('/', residenciaController.create); 

router.get("/:id", residenciaController.getById);

router.put('/:id', residenciaController.update);

module.exports = router;
