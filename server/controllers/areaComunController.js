const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const areaComun = await prisma.areaComun.findMany({
      orderBy: {
        id: "asc",
      }
    });
    response.json(areaComun);
  };

  

  module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const areaComun = await prisma.areaComun.findUnique({
      where: {id: id},
      
    });
    response.json(areaComun);
  };


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