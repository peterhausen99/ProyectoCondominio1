const express=require("express");
const router=express.Router();
//Controlador con las acciones de las rutas
const asignacionPlanController=require("../controllers/asignacionPlanController");
//Rutas de plans


router.get("/",asignacionPlanController.get);

router.get("/:id",asignacionPlanController.getById);

router.post('/create/:id', asignacionPlanController.create); 


router.get("/pago/:id",asignacionPlanController.getByIdPago);

router.get("/pendiente/:id",asignacionPlanController.getByIdPendiente);

router.put('/:id', asignacionPlanController.update);

/*router.get("/", reservaController.get);

router.get("/historial/:id", reservaController.getByUser);

//router.post('/', reservaController.create); 

router.post('/', reservaController.createByUser); 

router.get("/:id", reservaController.getById);



router.put('/:id', reservaController.update);
*/

module.exports=router;


