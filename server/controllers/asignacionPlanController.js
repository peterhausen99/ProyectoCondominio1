const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const asignacionPlanes = await prisma.asignacionPlan.findMany({
       include: {
        residencia: {include: {usuario:true}},
        plan: true
      },
    });
    response.json(asignacionPlanes);
  };




  module.exports.getByIdPago = async (request, response, next) => {

    let idRes = parseInt(request.params.id);
    const asignacionPlanes = await prisma.asignacionPlan.findMany({
      where: {
        idResidencia: idRes,
        estado:"Pago"
    },
      include: {
        residencia: {include: {usuario:true}},
        plan: true
      },
    });
    response.json(asignacionPlanes);
  };



  module.exports.getByIdPendiente = async (request, response, next) => {

    let idRes = parseInt(request.params.id);
    const asignacionPlanes = await prisma.asignacionPlan.findMany({
      where: {
        idResidencia: idRes,
        estado:"Pendiente"
    },
      include: {
        residencia: {include: {usuario:true}},
        plan: true
      },
    });
    response.json(asignacionPlanes);
  };

  module.exports.getById = async (request, response, next) => {

    let idRes = parseInt(request.params.id);
    const asignacionPlanes = await prisma.asignacionPlan.findMany({
      where: {
        idResidencia: idRes,
        
    },
      include: {
        residencia: {include: {usuario:true}},
        plan: true
      },
    });
    response.json(asignacionPlanes);
  };

  


module.exports.create = async (request, response, next,) => {
  let plan = request.body;
  const newPlan = await prisma.asignacionPlan.create({
    data: {
      idResidencia: parseInt(plan.idResidencia),
      idPlan: parseInt(plan.idPlan),
      mes: plan.mes,
      estado: "Pendiente",
      iva: plan.iva+1,
     total: plan.total+1
    },
  });
  response.json(newPlan);
};



module.exports.update = async (request, response, next) => {
  let asignacion = request.body;
  let idResidencia = parseInt(request.params.idResidencia);
  let idPlan = parseInt(request.params.idPlan);
  let mes = request.params.mes;
  
  // Obtener la asignación que está registrada en la BD
  const asignacionExistente = await prisma.asignacionPlan.findUnique({
    where: { idResidencia_idPlan_mes: { idResidencia, idPlan, mes } },
  });

  // Realizar la actualización de la asignación
  const nuevaAsignacion = await prisma.asignacionPlan.update({
    where: { idResidencia_idPlan_mes: { idResidencia, idPlan, mes } },
    data: {
      estado: asignacion.estado,
      iva: asignacion.iva,
      total: asignacion.total,
    },
  });

  // Responder con la asignación actualizada
  response.json(nuevaAsignacion);
};