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

  


module.exports.create = async (request, response, next) => {
};

module.exports.update = async (request, response, next) => {
};