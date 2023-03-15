import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidenciaAllComponent } from './incidencia-all/incidencia-all.component';
import { IncidenciaDetailComponent } from './incidencia-detail/incidencia-detail.component';

const routes: Routes = [

  {path:'incidencia/all',component:IncidenciaAllComponent},
  {path:'incidencia/:id',component:IncidenciaDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidenciaRoutingModule { }
