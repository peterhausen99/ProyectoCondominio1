import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionAllComponent } from './informacion-all/informacion-all.component';
import { InformacionDetailComponent } from './informacion-detail/informacion-detail.component';
import { InformacionFormComponent } from './informacion-form/informacion-form.component';
import { AuthGuard } from '../share/guards/auth.guard';

const routes: Routes = [
  {path:'informacion/all',component:InformacionAllComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'informacion/all',component:InformacionAllComponent},
  {path:'informacion/create',component:InformacionFormComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'informacion/create',component:InformacionFormComponent},
  {path:'informacion/:id',component:InformacionDetailComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'informacion/:id',component:InformacionDetailComponent},
  {path:'informacion/update/:id',component:InformacionFormComponent,canActivate:[AuthGuard],data:{roles:[1]}},
  //{path:'informacion/update/:id',component:InformacionFormComponent},

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionRoutingModule { }
