const express=require("express");
const router=express.Router();
//Controlador con las acciones de las rutas
const asignacionPlanController=require("../controllers/asignacionPlanController");
//Rutas de plans


router.get("/",asignacionPlanController.get);

router.get("/:id",asignacionPlanController.getById);


router.get("/pago/:id",asignacionPlanController.getByIdPago);

router.get("/pendiente/:id",asignacionPlanController.getByIdPendiente);





module.exports=router;


