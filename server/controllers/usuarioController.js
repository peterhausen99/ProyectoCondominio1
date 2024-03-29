const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.get = async (request, response, next) => {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        nombre: "asc",
      },
      include: {
        perfilUsuario: true
      },
    });
    response.json(usuarios);
  };

  module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const usuario = await prisma.usuario.findUnique({
      where: {
        idUsuario: id,
      },
      include: {
        perfilUsuario: true
      },
    });
    response.json(usuario);
  };


  module.exports.create = async (request, response, next) => {
    const userData = request.body;
    //Salt es una cadena aleatoria.
    //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
    // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
    let salt = bcrypt.genSaltSync(10);
    // Hash password
    let hash = bcrypt.hashSync(userData.contrasenna, salt);
   /*  const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt) */
    const user = await prisma.usuario.create({
      data: {
        idUsuario: parseInt(userData.idUsuario),
        perfilUsuarioId: parseInt(userData.perfilUsuarioId),
        nombre: userData.nombre,
        apellido1: userData.apellido1,
        apellido2: userData.apellido2,
        correo: userData.correo,
        telefono:userData.telefono,
        estado:userData.estado,
        contrasenna: hash
      },
    });
    response.status(200).json({
      status: true,
      message: "Usuario creado",
      data: user,
    });
  };


  
module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  //Buscar el usuario según el email dado
  const usuario = await prisma.usuario.findUnique({
    where: {correo: userReq.correo},
    include: { perfilUsuario: true
},
  });
  //Sino lo encuentra según su email
  if (!usuario) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  }
  //Verifica la contraseña
  const checkPassword = await bcrypt.compare(userReq.contrasenna, usuario.contrasenna);
  if (checkPassword === false) {
		response.status(401).send({
      success: false, 
      message: "Credenciales no validas",
    });
	}else{
   if(usuario.estado=="Inactivo"){
    response.status(423).send({
      success: false, 
      message: "Usario inactivo",
    });

   }else{ //Si el usuario es correcto: email y password
    //Crear el token
    const payload = {
      correo: usuario.correo,
      perfilUsuarioId: usuario.perfilUsuarioId,
      idUsuario:usuario.idUsuario,
      perfilUsuario: usuario.perfilUsuario
    };
    //Crea el token con el payload, llave secreta
    // y el tiempo de expiración
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    response.json({
      success: true,
      message: "Usuario registrado",
      data: {
        usuario,
        token,
      },
    });}
  }
};


//Actualizar un 
module.exports.update = async (request, response, next) => {
  let usuario = request.body;
  let id = parseInt(request.params.id);
  //Obtener el que esta registrado en la BD
  /*const usuarioExist = await prisma.usuario.findUnique({
    where: { idUsuario: id }, 
    
  });*/

  const newUsuario = await prisma.usuario.update({
    where: { idUsuario: usuario.idUsuario },
    data: {
      perfilUsuarioId: parseInt(usuario.perfilUsuarioId),
      nombre: usuario.nombre,
      apellido1: usuario.apellido1,
      apellido2: usuario.apellido2,
      correo: usuario.correo,
      contrasenna: usuario.contrasenna,
      telefono: usuario.telefono,
      estado: usuario.estado
    },
  });
  //response.json(newUsuario);
  response.json(newUsuario);
};







  