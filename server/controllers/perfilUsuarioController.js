const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



module.exports.get = async (request, response, next) => {
    const perfilUsuario = await prisma.perfilUsuario.findMany();
    response.json(perfilUsuario);
  };

module.exports.getById = async (request, response, next) => {
    //const var let
    let id = parseInt(request.params.id);
    const perfilUsuario = await prisma.perfilUsuario.findUnique({
      where: { id: id }
    });
    response.json(perfilUsuario);
  };

  