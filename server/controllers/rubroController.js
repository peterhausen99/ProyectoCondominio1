const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const rubros = await prisma.rubro.findMany({
      orderBy: {
        id: "asc",
      },
    });
    response.json(rubros);
  };
  module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const rubro = await prisma.rubro.findUnique({
      where: {
        id: id,
      }
    });
    response.json(rubro);
  };