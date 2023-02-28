import { PrismaClient } from "@prisma/client";
import { residencias } from "./seeds/residencia";
import { usuarios } from "./seeds/usuario";
import { perfilUsuarios } from "./seeds/perfilUsuario";
import { rubros } from "./seeds/rubro";
//import { planes } from "./seeds/plan";

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
    await prisma.rubro.createMany({
        data: rubros
    });
    /*await prisma.plan.createMany({
        data: planes
    });*/
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