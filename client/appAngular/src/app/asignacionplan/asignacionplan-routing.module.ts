import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionplanAllComponent } from './asignacionplan-all/asignacionplan-all.component';
import { AsignacionplanCreateComponent } from './asignacionplan-create/asignacionplan-create.component';
import { AsignacionplanDetailComponent } from './asignacionplan-detail/asignacionplan-detail.component';


const routes: Routes = [

  {path:'asignacionplan',component:AsignacionplanAllComponent},
  {path:'asignacionplan/:id',component:AsignacionplanDetailComponent},
  {path:'asignacionplan/create/:id', component:AsignacionplanCreateComponent},
 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionplanRoutingModule { }