const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const incidencia = await prisma.incidencia.findMany({
      orderBy: {
        id: "asc",
      }, include: {
        usuario: true
      },
    });
    response.json(incidencia);
  };

  module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const incidencia = await prisma.incidencia.findUnique({
      where: {id: id,},
      include: {
        usuario: true
      },
    });
    response.json(incidencia);
  };


  
module.exports.create = async (request, response, next) => {
};

module.exports.update = async (request, response, next) => {
};