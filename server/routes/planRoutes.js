const express=require("express");
const router=express.Router();
//Controlador con las acciones de las rutas
const planController=require("../controllers/planController");
//Rutas de plans

//localhost:3000/plan/
router.get("/",planController.get);
router.post('/', planController.create); 
//localhost:3000/plan/1
router.get("/:id",planController.getById);
router.put('/:id', planController.update);



module.exports = router;



module.exports=router;