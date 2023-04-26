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

 /* model Residencia {
    id Int @id @default(autoincrement())
    usuario   Usuario @relation(fields: [idUsuario], references: [idUsuario])
    idUsuario Int
    cantidadPersonas Int
    estado           String
    annoInicio       DateTime @default(now())
    cantidadCarros   Int
    createdAt        DateTime @default(now())
    updatedAt        DateTime @default(now()) @updatedAt
    plan AsignacionPlan []
  }

        last insert
        id:4,
        idUsuario: 405660125,
        cantidadPersonas: 1,
        estado: "Activo",
        annoInicio: new Date("2022-12-20"),
        cantidadCarros: 1,


  */

//nuevo modulo
module.exports.create = async (request, response, next) => {
  let residencia = request.body;
  const newResidencia = await prisma.residencia.create({
    data: {
      usuario: { connect: { idUsuario: parseInt(residencia.idUsuario) } },
      cantidadPersonas: parseInt(residencia.cantidadPersonas),
        estado: residencia.estado,
        cantidadCarros: parseInt(residencia.cantidadCarros),
      
    },
  });
  response.json(newResidencia);
};
//nuevo modulo
  module.exports.update = async (request, response, next) => {
    let residencia = request.body;
    let idResidencia = parseInt(request.params.id);
    //Obtener el  que esta registrado en la BD
    const residenciaExist = await prisma.residencia.findUnique({
      where: { id: idResidencia }, 
    });
  
    const newResidencia = await prisma.residencia.update({
      where: { id: idResidencia },
      data: {
        usuario: { connect: { idUsuario: parseInt(residencia.idUsuario) } },
        cantidadPersonas: parseInt(residencia.cantidadPersonas),
        estado: residencia.estado,
        cantidadCarros: parseInt(residencia.cantidadCarros),
        
      },
    });
    response.json(newResidencia);
  };