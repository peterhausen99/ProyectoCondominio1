import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserAllComponent } from './user-all/user-all.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  {
    path: 'usuario',component: UserIndexComponent,
    children: [
     /* { path: 'create', component: UserFormComponent },*/
      { path: 'login', component: UserLoginComponent },
    ],
  },

  {path:'usuario/all',component:UserAllComponent,canActivate:[AuthGuard],data:{roles:[1]}},
 // {path:'usuario/all',component:UserAllComponent},
  {path:'usuario/create',component:UserFormComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'usuario/create',component:UserFormComponent},
  {path:'usuario/update/:id',component:UserFormComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'usuario/update/:id',component:UserFormComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
