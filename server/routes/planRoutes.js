const express=require("express");
const router=express.Router();
//Controlador con las acciones de las rutas
const planController=require("../controllers/planController");
//Rutas de plans

//localhost:3000/plan/
router.get("/",planController.get);
//localhost:3000/plan/1
router.get("/:id",planController.getById);



module.exports=router;