const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
    const reserva = await prisma.reserva.findMany({
       include: {
        areaComun: true, usuario:true
      },
    });
    response.json(reserva);
  };



  module.exports.getById = async (request, response, next) => {

    let id = parseInt(request.params.id);
    const reserva = await prisma.reserva.findUnique({
      where: {
        id: id
    },
      include: {
        areaComun: true, usuario:true
      },
    });
    response.json(reserva);
  };


  module.exports.createByUser = async (request, response, next) => {
 
    let reserva = request.body;
    const newReserva = await prisma.reserva.create({
      data: {
        idUsuario: parseInt(reserva.idUsuario),
        idAreaComun: parseInt(reserva.idAreaComun),
       diaReservacion: reserva.diaReservacion,
       estado: reserva.estado,
       detalles: reserva.detalles,
       horario: reserva.horario
      },
    });
    response.json(newReserva);
  };


  //Actualizar un 
module.exports.update = async (request, response, next) => {
    let reserva = request.body;
    let idReserva = parseInt(request.params.id);
    //Obtener el que esta registrado en la BD
    const reservaExist = await prisma.reserva.findUnique({
      where: { id: idReserva }, 
      
    });
  
    const newReserva = await prisma.reserva.update({
      where: { id: idReserva },
      data: {
        idUsuario: parseInt(reserva.idUsuario),
        idAreaComun: parseInt(reserva.idAreaComun),
       diaReservacion: reserva.diaReservacion,
      estado: reserva.estado,
      detalles: reserva.detalles,
      horario: reserva.horario
      },
    });
    response.json(newReserva);
  };