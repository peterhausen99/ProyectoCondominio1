import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionplanAllComponent } from './asignacionplan-all/asignacionplan-all.component';
import { AsignacionplanAdminComponent } from './asignacionplan-admin/asignacionplan-admin.component';
import { AsignacionplanDetailComponent } from './asignacionplan-detail/asignacionplan-detail.component';


const routes: Routes = [

  {path:'asignacionplan',component:AsignacionplanAllComponent},
  {path:'asinacionplan/admin', component:AsignacionplanAdminComponent},
  {path:'asignacionplan/:id',component:AsignacionplanDetailComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionplanRoutingModule { }