const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const residencias = await prisma.residencia.findMany({
      orderBy: {
        id: "asc",
      },
    });
    response.json(residencias);
  };
  module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const residencia = await prisma.residencia.findUnique({
      where: {
        id: id,
      }
    });
    response.json(residencia);
  };