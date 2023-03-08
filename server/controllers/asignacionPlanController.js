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

  


module.exports.create = async (request, response, next) => {
};

module.exports.update = async (request, response, next) => {
};