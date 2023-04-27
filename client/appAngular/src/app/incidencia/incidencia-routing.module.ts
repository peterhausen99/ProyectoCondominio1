import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidenciaAllComponent } from './incidencia-all/incidencia-all.component';
import { IncidenciaDetailComponent } from './incidencia-detail/incidencia-detail.component';
import { IncidenciaFormUserComponent } from './incidencia-form-user/incidencia-form-user.component';
import { IncidenciaFormComponent } from './incidencia-form/incidencia-form.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [


  {path:'incidencia/all',component:IncidenciaAllComponent,canActivate:[AuthGuard],data:{roles:[1]}},//1 es admin - 2 es residente
//{path:'incidencia/all',component:IncidenciaAllComponent},
   {path:'incidencia/create',component:IncidenciaFormComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'incidencia/create',component:IncidenciaFormComponent},
  {path:'incidencia/createByUser',component:IncidenciaFormUserComponent},
  //{path:'incidencia/createByUser',component:IncidenciaFormUserComponent},
  {path:'incidencia/:id',component:IncidenciaDetailComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'incidencia/:id',component:IncidenciaDetailComponent},
  {path:'incidencia/update/:id',component:IncidenciaFormComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'incidencia/update/:id',component:IncidenciaFormComponent},


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidenciaRoutingModule { }
