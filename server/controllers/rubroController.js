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


  module.exports.create = async (request, response, next) => {
    let rubro = request.body;
    const newRubro = await prisma.rubro.create({
      data: {
        descripcion: rubro.descripcion,
        valor: rubro.valor,
        estado: rubro.estado,
      },
    });
    response.json(newRubro);
  };


  module.exports.update = async (request, response, next) => {
    let rubro = request.body;
    let idRubro = parseInt(request.params.id);
    //Obtener el  que esta registrado en la BD
    const rubroExist = await prisma.rubro.findUnique({
      where: { id: idRubro }, 
    });
  
    const newRubro = await prisma.rubro.update({
      where: { id: idRubro},
      data: {
        id: rubro.id,
        descripcion: rubro.descripcion,
        valor: rubro.valor,
        estado: rubro.estado,
      },
    });
    response.json(newRubro);
  };
  