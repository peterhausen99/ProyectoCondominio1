import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaAllComponent } from './reserva-all/reserva-all.component';
import { ReservaFormUserComponent } from './reserva-form-user/reserva-form-user.component';
import { ReservaDetailComponent } from './reserva-detail/reserva-detail.component';
import { ReservaFormAdminComponent } from './reserva-form-admin/reserva-form-admin.component';
import { ReservaHistorialComponent } from './reserva-historial/reserva-historial.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  {path:'reserva/all',component:ReservaAllComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'reserva/all',component:ReservaAllComponent},
  {path:'reserva/historial',component:ReservaHistorialComponent},
  //{path:'reserva/historial',component:ReservaHistorialComponent},
  {path:'reserva/createByUser',component:ReservaFormUserComponent},
  //{path:'reserva/createByUser',component:ReservaFormUserComponent},
  {path:'reserva/:id',component:ReservaDetailComponent},
  //{path:'reserva/:id',component:ReservaDetailComponent},
  {path:'reserva/update/:id',component:ReservaFormAdminComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'reserva/update/:id',component:ReservaFormAdminComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }
