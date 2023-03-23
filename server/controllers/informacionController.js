//informacion
//Informacion
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const informacion = await prisma.informacion.findMany({
      orderBy: {
        id: "asc",
      }
    });
    response.json(informacion);
  };

  







  module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const informacion = await prisma.informacion.findUnique({
      where: {id: id},
      
    });
    response.json(informacion);
  };










  module.exports.create = async (request, response, next) => {
    let informacion = request.body;
    const newInformacion = await prisma.informacion.create({
      data: {

        titulo: informacion.titulo,
        mensaje: informacion.mensaje,
        estado: informacion.estado,
      },
    });
    response.json(newInformacion);
  };











  module.exports.update = async (request, response, next) => {
    let informacion = request.body;
    let idInformacion = parseInt(request.params.id);
    //Obtener el  que esta registrado en la BD
    const informacionExist = await prisma.informacion.findUnique({
      where: { id: idInformacion }, 
    });
  
    const newInformacion = await prisma.informacion.update({
      where: { id: idInformacion },
      data: {
        id: informacion.id,
        titulo: informacion.titulo,
        mensaje: informacion.mensaje,
        estado: informacion.estado,
      },
    });
    response.json(newInformacion);
  };
  