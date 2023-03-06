const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        nombre: "asc",
      },
    });
    response.json(usuarios);
  };

  module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.idCedula);
    const usuario = await prisma.usuario.findUnique({
      where: {
        idCedula: id,
      }
    });
    response.json(usuario);
  };
  