const express=require("express");
const router=express.Router();
//Controlador con las acciones de las rutas
const asignacionPlanController=require("../controllers/asignacionPlanController");
//Rutas de plans

//localhost:3000/plan/
router.get("/",asignacionPlanController.get);
//localhost:3000/plan/1
router.get("/pago/:id",asignacionPlanController.getByIdPago);

router.get("/pendiente/:id",asignacionPlanController.getByIdPendiente);





module.exports=router;


