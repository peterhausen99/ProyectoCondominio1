import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RubroIndexComponent } from './rubro-index/rubro-index.component';
import { RubroFormComponent } from './rubro-form/rubro-form.component';

const routes: Routes = [
  {path:'rubro',component:RubroIndexComponent},
  {path:'rubro/create',component:RubroFormComponent},
  {path:'rubro/update/:id',component:RubroFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RubroRoutingModule { }
