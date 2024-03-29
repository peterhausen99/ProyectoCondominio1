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
 
  let incidencia = request.body;
  const newIncidencia = await prisma.incidencia.create({
    data: {
      idUsuario: parseInt(incidencia.idUsuario),
      titulo: incidencia.titulo,
      descripcion: incidencia.descripcion,
      estado: incidencia.estado,
      fecha: incidencia.fecha
    },
  });
  response.json(newIncidencia);
};


module.exports.createByUser = async (request, response, next) => {
 
  let incidencia = request.body;
  const newIncidencia = await prisma.incidencia.create({
    data: {
      idUsuario: parseInt(incidencia.idUsuario),
      titulo: incidencia.titulo,
      descripcion: incidencia.descripcion,
      estado: incidencia.estado,
      fecha: incidencia.fecha
    },
  });
  response.json(newIncidencia);
};



//Actualizar un 
module.exports.update = async (request, response, next) => {
  let incidencia = request.body;
  let idIncidencia = parseInt(request.params.id);
  //Obtener el que esta registrado en la BD
  const incidenciaExist = await prisma.incidencia.findUnique({
    where: { id: idIncidencia }, 
    
  });

  const newIncidencia = await prisma.incidencia.update({
    where: { id: idIncidencia },
    data: {
      idUsuario: incidencia.idUsuario,
      titulo: incidencia.titulo,
      descripcion: incidencia.descripcion,
      estado: incidencia.estado,
      fecha: incidencia.fecha,
      
      
    },
  });
  response.json(newIncidencia);
};
