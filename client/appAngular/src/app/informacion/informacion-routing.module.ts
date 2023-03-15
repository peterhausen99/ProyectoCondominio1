import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionAllComponent } from './informacion-all/informacion-all.component';
import { InformacionDetailComponent } from './informacion-detail/informacion-detail.component';
import { InformacionFormComponent } from './informacion-form/informacion-form.component';

const routes: Routes = [
  {path:'informacion/all',component:InformacionAllComponent},
  {path:'informacion/create',component:InformacionFormComponent},
  {path:'informacion/:id',component:InformacionDetailComponent},
  {path:'informacion/update/:id',component:InformacionFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionRoutingModule { }
