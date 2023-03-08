import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionAllComponent } from './asignacion-all/asignacion-all.component';
import { AsignacionDetailComponent } from './asignacion-detail/asignacion-detail.component';
import { AsignacionFormComponent } from './asignacion-form/asignacion-form.component';
import { AsignacionIndexComponent } from './asignacion-index/asignacion-index.component';

const routes: Routes = [
  {path:'asignacion',component:AsignacionIndexComponent},
  {path:'asignacion/all',component:AsignacionAllComponent},
  {path:'asignacion/create',component:AsignacionFormComponent},
  {path:'asignacion/:id',component:AsignacionDetailComponent},
  {path:'asignacion/update/:id',component:AsignacionFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionRoutingModule { }
