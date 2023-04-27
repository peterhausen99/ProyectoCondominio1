import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RubroIndexComponent } from './rubro-index/rubro-index.component';
import { RubroFormComponent } from './rubro-form/rubro-form.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  {path:'rubro',component:RubroIndexComponent,canActivate:[AuthGuard],data:{roles:[1]}},
 // {path:'rubro',component:RubroIndexComponent},
  {path:'rubro/create',component:RubroFormComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'rubro/create',component:RubroFormComponent},
  {path:'rubro/update/:id',component:RubroFormComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'rubro/update/:id',component:RubroFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RubroRoutingModule { }
