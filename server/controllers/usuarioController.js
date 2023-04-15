const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.get = async (request, response, next) => {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        nombre: "asc",
      },
    });
    response.json(usuarios);
  };

  module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const usuario = await prisma.usuario.findUnique({
      where: {
        idUsuario: id,
      }
    });
    response.json(usuario);
  };


  module.exports.register = async (request, response, next) => {
    const userData = request.body;
    //Salt es una cadena aleatoria.
    //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
    // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
    let salt = bcrypt.genSaltSync(10);
    // Hash password
    let hash = bcrypt.hashSync(userData.password, salt);
   /*  const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt) */
    const user = await prisma.usuario.create({
      data: {
        idUsuario: userData.idUsuario,
        perfilUsuarioId: userData.perfilUsuarioId,
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
  const user = await prisma.Usuario.findUnique({
    where: {
      correo: userReq.correo,
    },
  });
  //Sino lo encuentra según su email
  if (!user) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  }
  //Verifica la contraseña
  const checkPassword = await bcrypt.compare(userReq.contrasenna, user.contrasenna);
  if (checkPassword === false) {
		response.status(401).send({
      success: false, 
      message: "Credenciales no validas",
    });
	}else{
    //Si el usuario es correcto: email y password
    //Crear el token
    const payload = {
      correo: user.correo,
      perfilUsuarioId: user.perfilUsuarioId,
      idUsuario:user.idUsuario
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
        user,
        token,
      },
    });
  }
};






  