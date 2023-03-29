import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatDividerModule } from '@angular/material/divider';

import { LayoutModule} from '@angular/cdk/layout';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';

import { IncidenciaRoutingModule } from './incidencia-routing.module';
import { IncidenciaAllComponent } from './incidencia-all/incidencia-all.component';
import { IncidenciaDetailComponent } from './incidencia-detail/incidencia-detail.component';
import { IncidenciaFormComponent } from './incidencia-form/incidencia-form.component';
import { IncidenciaFormUserComponent } from './incidencia-form-user/incidencia-form-user.component';



@NgModule({
  declarations: [
    IncidenciaAllComponent,
    IncidenciaDetailComponent,
    IncidenciaFormComponent,
    IncidenciaFormUserComponent,

  ],
  imports: [
    CommonModule,
    IncidenciaRoutingModule,
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
export class IncidenciaModule { }
