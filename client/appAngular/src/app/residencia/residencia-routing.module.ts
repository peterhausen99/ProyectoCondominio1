import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidenciaAllComponent } from './residencia-all/residencia-all.component';
import { ResidenciaDetailComponent } from './residencia-detail/residencia-detail.component';
import { ResidenciaIndexComponent } from './residencia-index/residencia-index.component';

const routes: Routes = [
  {path:'residencia',component:ResidenciaIndexComponent},
  {path:'residencia/all',component:ResidenciaAllComponent},
  {path:'residencia/:id',component:ResidenciaDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidenciaRoutingModule { }
