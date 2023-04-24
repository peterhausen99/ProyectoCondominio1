//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Residencia controller para los métodos definidos
const usuarioController = require("../controllers/usuarioController");

//Definición de rutas para generos
router.get("/", usuarioController.get);

router.get("/:id", usuarioController.getById);

router.post("/login", usuarioController.login);

router.post("/", usuarioController.create);

router.put('/:id', usuarioController.update);



module.exports = router;