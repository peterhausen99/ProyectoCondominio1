import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { UserIndexComponent } from './user/user-index/user-index.component';


const routes: Routes = [
// { path: '', component: InicioComponent, redirectTo: '', pathMatch: 'full' },
 { path: '', component: UserIndexComponent, redirectTo: '', pathMatch: 'full' },


  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
