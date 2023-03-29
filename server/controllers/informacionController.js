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

<<<<<<< HEAD
=======
  //AVISOS
  module.exports.getAviso = async (request, response, next) => {
    const informacion = await prisma.informacion.findMany({
      where:{
        estado:"Activo",
        tipo: "Aviso"
      }

    });
    response.json(informacion);
  };

  //NOTICIA
  module.exports.getNoticia = async (request, response, next) => {
    const informacion = await prisma.informacion.findMany({
      where:{
        estado:"Activo",
        tipo: "Noticia"
      }

    });
    response.json(informacion);
  };

  //ARCHIVO
  module.exports.getArchivo = async (request, response, next) => {
    const informacion = await prisma.informacion.findMany({
      where:{
        estado:"Activo",
        tipo: "Archivos"
      }

    });
    response.json(informacion);
  };

  






>>>>>>> a954d25be225db0ed55e06c3cac354199604baf1

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
        tipo: informacion.tipo,
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
        //id: informacion.id,
        titulo: informacion.titulo,
        mensaje: informacion.mensaje,
        estado: informacion.estado,
        tipo: informacion.tipo,
      },
    });
    response.json(newInformacion);
  };
  