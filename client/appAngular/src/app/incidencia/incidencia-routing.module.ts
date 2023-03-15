import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidenciaAllComponent } from './incidencia-all/incidencia-all.component';
import { IncidenciaDetailComponent } from './incidencia-detail/incidencia-detail.component';
import { IncidenciaFormComponent } from './incidencia-form/incidencia-form.component';

const routes: Routes = [

  {path:'incidencia/all',component:IncidenciaAllComponent},
  {path:'incidencia/create',component:IncidenciaFormComponent},
  {path:'incidencia/:id',component:IncidenciaDetailComponent},
  {path:'incidencia/update/:id',component:IncidenciaFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidenciaRoutingModule { }
