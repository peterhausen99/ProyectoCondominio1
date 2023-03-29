//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Genero controller para los métodos definidos
const rubroController = require("../controllers/rubroController");

//Definición de rutas para rubro
router.get("/", rubroController.get);
router.post('/', rubroController.create); 
router.get("/:id", rubroController.getById);
router.put('/:id', rubroController.update);
module.exports = router;

