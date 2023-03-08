import { PrismaClient } from "@prisma/client";
import { residencias } from "./seeds/residencia";
import { usuarios } from "./seeds/usuario";
import { perfilUsuarios } from "./seeds/perfilUsuario";
import { rubros } from "./seeds/rubro";


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

    //creacion de planes
    await prisma.plan.create({
        data:{
            id:1,
            descripcion:"Plan 1",
            totalPlan:10000,
            rubros:{
                connect: [{id: 1}],
            },
        },
    });
    await prisma.plan.create({
        data:{
            id:2,
            descripcion:"Plan 2",
            totalPlan:25000,
            rubros:{
                connect: [{id: 1},{id:2}],
            },
        },
    });
    await prisma.plan.create({
        data:{
            id:3,
            descripcion:"Plan 3",
            totalPlan:30000,
            rubros:{
                connect: [{id: 1},{id:2},{id:3}],
            },
        },
    });
    await prisma.plan.create({
        data:{
            id:4,
            descripcion:"Plan 4",
            totalPlan:50000,
            rubros:{
                connect: [{id: 1},{id:2},{id:3},{id:4}],
            },
        },
    });

 //creacion asignacion plan(estado cuenta)
 
await 

 await prisma.plan.create({
    data:{
        id:4,
        descripcion:"Plan 4",
        totalPlan:50000,
        rubros:{
            connect: [{id: 1},{id:2},{id:3},{id:4}],
        },
    },
});




}//cierra main



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