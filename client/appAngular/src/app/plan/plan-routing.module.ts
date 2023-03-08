import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanAllComponent } from './plan-all/plan-all.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { PlanIndexComponent } from './plan-index/plan-index.component';
const routes: Routes = [
  {path:'plan',component:PlanIndexComponent},
  {path:'plan/all',component:PlanAllComponent},
  {path:'plan/create',component:PlanFormComponent},
  {path:'plan/:id',component:PlanDetailComponent},
  {path:'plan/update/:id',component:PlanFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
