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
import {MatDatepickerModule} from '@angular/material/datepicker';

import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaDetailComponent } from './reserva-detail/reserva-detail.component';
import { ReservaAllComponent } from './reserva-all/reserva-all.component';
import { ReservaFormAdminComponent } from './reserva-form-admin/reserva-form-admin.component';
import { ReservaFormUserComponent } from './reserva-form-user/reserva-form-user.component';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    ReservaDetailComponent,
    ReservaAllComponent,
    ReservaFormAdminComponent,
    ReservaFormUserComponent
  ],
  imports: [
    CommonModule,
    ReservaRoutingModule,
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
    ReactiveFormsModule,
    MatDatepickerModule, 
    MatNativeDateModule
  ]
})
export class ReservaModule { }
