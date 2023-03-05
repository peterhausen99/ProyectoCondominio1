import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidenciaRoutingModule } from './residencia-routing.module';
import { ResidenciaIndexComponent } from './residencia-index/residencia-index.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
    ResidenciaIndexComponent
  ],
  imports: [
    CommonModule,
    ResidenciaRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class ResidenciaModule { }
