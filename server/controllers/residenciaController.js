const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const residencias = await prisma.residencia.findMany({
      orderBy: {
        id: "asc",
      }, include: {
        usuario: true
      },
    });
    response.json(residencias);
  };
  
  module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const residencia = await prisma.residencia.findUnique({
      where: {id: id,},
      include: {
        usuario: true
      },
    });
    response.json(residencia);
  };
//nuevo modulo
  module.exports.create = async (request, response, next) => {
    let areaComun = request.body;
    const newAreaComun = await prisma.areaComun.create({
      data: {
        descripcion: areaComun.descripcion,
        estado: areaComun.estado
      },
    });
    response.json(newAreaComun);
  };
//nuevo modulo
  module.exports.update = async (request, response, next) => {
    let areaComun = request.body;
    let idAreaComun = parseInt(request.params.id);
    //Obtener el  que esta registrado en la BD
    const areaComunExist = await prisma.areaComun.findUnique({
      where: { id: idAreaComun }, 
    });
  
    const newAreaComun = await prisma.areaComun.update({
      where: { id: idAreaComun },
      data: {
        //id: informacion.id,
        descripcion: areaComun.descripcion,
        estado: areaComun.estado,

      },
    });
    response.json(newAreaComun);
  };