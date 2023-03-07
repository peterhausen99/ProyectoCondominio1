import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RubroIndexComponent } from './rubro-index/rubro-index.component';

const routes: Routes = [
  {path:'rubro',component:RubroIndexComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RubroRoutingModule { }
