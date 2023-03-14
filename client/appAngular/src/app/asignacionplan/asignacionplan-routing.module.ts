import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionplanAllComponent } from './asignacionplan-all/asignacionplan-all.component';
import { AsignacionplanDetailComponent } from './asignacionplan-detail/asignacionplan-detail.component';


const routes: Routes = [

  {path:'asignacionplan',component:AsignacionplanAllComponent},
  {path:'asignacionplan/:id',component:AsignacionplanDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionplanRoutingModule { }