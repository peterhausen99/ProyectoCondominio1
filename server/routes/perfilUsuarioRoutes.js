//Express para agregar las rutas
const express = require("express");
const router = express.Router();


const perfilUsuarioController = require("../controllers/perfilUsuarioController");

router.get("/", perfilUsuarioController.get);

router.get("/:id", perfilUsuarioController.getById);

module.exports = router;