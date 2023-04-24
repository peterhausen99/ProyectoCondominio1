import { PrismaClient } from "@prisma/client";
import { residencias } from "./seeds/residencia";
import { incidencia } from "./seeds/incidencia";
import { usuarios } from "./seeds/usuario";
import { perfilUsuarios } from "./seeds/perfilUsuario";
import { rubros } from "./seeds/rubro";
import { informacion } from "./seeds/informacion";
import { areaComun } from "./seeds/areaComun";


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
 


 await prisma.asignacionPlan.create({
    data:{
        residencia: {connect: {id: 1}},
        plan: {connect: {id: 1}},
        mes:"Enero",
        estado:"Pago",
        iva: 1950,
        total: 15000, 
    }
});

await prisma.asignacionPlan.create({
    data:{
        residencia: {connect: {id: 1}},
        plan: {connect: {id: 1}},
        mes:"Febrero",
        estado:"Pendiente",
        iva: 1950,
        total: 15000, 
    }
});

await prisma.asignacionPlan.create({
    data:{
        residencia: {connect: {id: 2}},
        plan: {connect: {id: 1}},
        mes:"Enero",
        estado:"Pendiente",
        iva: 1950,
        total: 15000, 
    }
});

await prisma.asignacionPlan.create({
    data:{
        residencia: {connect: {id: 2}},
        plan: {connect: {id: 1}},
        mes:"Febrero",
        estado:"Pendiente",
        iva: 1950,
        total: 15000, 
    }
});

//Incidencias
await prisma.incidencia.createMany({
    data: incidencia
});

//Informacion
await prisma.informacion.createMany({
    data: informacion
});

//Area Comun
await prisma.areaComun.createMany({
    data: areaComun
});


//Reservas
//Estado: Pendiente-Aprobado
//Horario: Mañana-Tarde-Noche
await prisma.reserva.create({
    data:{
        areaComun: {connect: {id: 1}},
        usuario:{connect:{idUsuario:302360215}},
        diaReservacion: new Date("2023-04-12"),
        estado: "Pendiente",
        detalles: "no indica",
        horario: "Mañana"
    }
});
await prisma.reserva.create({
    data:{
        areaComun: {connect: {id: 2}},
        usuario:{connect:{idUsuario:302360215}},
       diaReservacion: new Date("2023-04-13"),
       estado: "Pendiente",
       detalles: "no indica",
       horario: "Mañana"
    }
});
await prisma.reserva.create({
    data:{
        areaComun: {connect: {id: 3}},
        usuario:{connect:{idUsuario:405660125}},
       diaReservacion: new Date("2023-04-14"),
       estado: "Pendiente",
       detalles: "no indica",
       horario: "Noche"
    }
});
await prisma.reserva.create({
    data:{
        areaComun: {connect: {id: 4}},
        usuario:{connect:{idUsuario:405660125}},
       diaReservacion: new Date("2023-04-15"),
    estado: "Pendiente",
       detalles: "no indica",
       horario: "Tarde"
    }
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