import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidenciaIndexComponent } from './residencia-index/residencia-index.component';

const routes: Routes = [
  {
    path:'residencia',component:ResidenciaIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidenciaRoutingModule { }
