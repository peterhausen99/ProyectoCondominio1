import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidenciaAllComponent } from './residencia-all/residencia-all.component';

import { ResidenciaIndexComponent } from './residencia-index/residencia-index.component';

const routes: Routes = [
  {path:'residencia',component:ResidenciaIndexComponent},
  {path:'residencia/all',component:ResidenciaAllComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidenciaRoutingModule { }
