//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Genero controller para los métodos definidos
const informacionController = require("../controllers/informacionController");

//Definición de rutas para incidencia
router.get("/", informacionController.get);

router.post('/', informacionController.create); 

router.get("/aviso",informacionController.getAviso);
router.get("/noticia",informacionController.getNoticia);
router.get("/archivo",informacionController.getArchivo);

router.get("/:id", informacionController.getById);



router.put('/:id', informacionController.update);

module.exports = router;