import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionRoutingModule } from './asignacion-routing.module';
import { AsignacionAllComponent } from './asignacion-all/asignacion-all.component';
import { AsignacionDetailComponent } from './asignacion-detail/asignacion-detail.component';
import { AsignacionDiagComponent } from './asignacion-diag/asignacion-diag.component';
import { AsignacionFormComponent } from './asignacion-form/asignacion-form.component';
import { AsignacionIndexComponent } from './asignacion-index/asignacion-index.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {LayoutModule} from '@angular/cdk/layout';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AsignacionAllComponent,
    AsignacionDetailComponent,
    AsignacionDiagComponent,
    AsignacionFormComponent,
    AsignacionIndexComponent
  ],
  imports: [
    CommonModule,
    AsignacionRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule
  ]
})
export class AsignacionModule { }
