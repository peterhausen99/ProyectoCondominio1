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


module.exports.getByIdRubro = async (id) => {
  const rubro = await prisma.rubro.findUnique({
    where: {
      id: id,
    },
  });
  return rubro;
};

module.exports.create = async (request, response, next) => {
  let plan = request.body;
  let suma = 0;
  listaRubros= plan.rubros
  for (let index = 0; index < plan.rubros.length; index++) {
    let rubro = await module.exports.getByIdRubro(listaRubros[index].id);
    suma += parseFloat(rubro.valor);
  }
  const newPlan = await prisma.plan.create({
    data: {
      descripcion: plan.descripcion,
      totalPlan: suma,
      rubros: {
        connect: plan.rubros,
      },
    },
  });
  response.json(newPlan);
};

/*FUNCIONANDO
module.exports.create = async (request, response, next) => {
    let plan = request.body;
    const newPlan = await prisma.plan.create({
      data: {
        descripcion : plan.descripcion,
        totalPlan : plan.totalPlan,
        rubros: {
            connect: plan.rubros,
        },
      },
    });
    response.json(newPlan);
  };
  */

/*
module.exports.create = async (request, response, next) => {
    let plan = request.body;
    const newPlan = await prisma.plan.create({
      data: {
        descripcion : plan.descripcion,
        totalPlan :{
            sum: {
                valor: {
                  in: plan.rubros.valor.map(rubro => rubro.valor)
                }
              }
        },
        rubros: {
            connect: plan.rubros,
        },
      },
    });
    response.json(newPlan);
  };
  */

  module.exports.update = async (request, response, next) => {
    let plan = request.body;
    let idPlan = parseInt(request.params.id);
    //Obtener el plan que esta registrado en la BD
    const planExist = await prisma.plan.findUnique({
      where: { id: idPlan }, 
      include: {
        rubros: {
          select: { id: true },
        },
      },
    });

    let suma = 0;
    listaRubros= plan.rubros
    for (let index = 0; index < plan.rubros.length; index++) {
      let rubro = await module.exports.getByIdRubro(listaRubros[index].id);
      suma += parseFloat(rubro.valor);
    }
  
    const newPlan = await prisma.plan.update({
      where: { id: idPlan },
      data: {
        descripcion : plan.descripcion,
        totalPlan : suma,
        rubros: {
          disconnect:planExist.rubros,
          connect: plan.rubros,
        },
      },
    });
    response.json(newPlan);
  };