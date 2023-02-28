export const planes = [
//plan 1
{
    id:1,
    descripcion:"Plan 1",
    totalPlan:10000,
    rubro:{
        connect:[{id:1}]
    }
},
//plan 2
{
    id:2,
    descripcion:"Plan 2",
    totalPlan:25000,
    rubro:{
        connect:[{id:1}, {id:2}]
    }
},
//plan 3
{
    id:3,
    descripcion:"Plan 3",
    totalPlan:30000,
    rubro:{
        connect:[{id:1}, {id:2}, {id:3}]
    }
},
//plan 4
{
    id:4,
    descripcion:"Plan 4",
    totalPlan:50000,
    rubro:{
        connect:[{id:1}, {id:2}, {id:3}, {id:4}]
    }
},
]