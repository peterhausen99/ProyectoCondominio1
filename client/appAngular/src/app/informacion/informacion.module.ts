import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformacionRoutingModule } from './informacion-routing.module';
import { InformacionAllComponent } from './informacion-all/informacion-all.component';
import { InformacionDetailComponent } from './informacion-detail/informacion-detail.component';
import { InformacionFormComponent } from './informacion-form/informacion-form.component';


@NgModule({
  declarations: [
    InformacionAllComponent,
    InformacionDetailComponent,
    InformacionFormComponent
  ],
  imports: [
    CommonModule,
    InformacionRoutingModule
  ]
})
export class InformacionModule { }
