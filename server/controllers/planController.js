const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
    const plans=await prisma.plan.findMany({
        include:{
            rubros:true,
        }
    });
    response.json(plans);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    //const var let 
    let id= parseInt(request.params.id);
    const plan= await prisma.plan.findUnique({
        where: {id: id },
        include:{
            rubros:true,
        }
    });
    response.json(plan);
};
//Crear un plan
module.exports.create = async (request, response, next) => {
};
//Actualizar un plan
module.exports.update = async (request, response, next) => {
};