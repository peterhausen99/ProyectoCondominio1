import { PrismaClient } from "@prisma/client";
import { residencias } from "./seeds/residencia";
import { usuarios } from "./seeds/usuario";
import { perfilUsuarios } from "./seeds/perfilUsuario";

const prisma=new PrismaClient();


async function main() {


    await prisma.perfilUsuario.createMany({
        data: perfilUsuarios
    });

    await prisma.usuario.createMany({
        data: usuarios
    });

    await prisma.residencia.createMany({
        data: residencias
    });
   
}



main()
.then(async()=>{
    await prisma.$disconnect();
})
.catch(async e=>{
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})


/*main().catch(e=> {
    console.log(e);
    process.exit(1);
}).finally(()=>{ prisma.$disconnect()})*/