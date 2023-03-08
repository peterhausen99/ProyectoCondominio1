import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignacionplanRoutingModule } from './asignacionplan-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatDividerModule } from '@angular/material/divider';
import { AsignacionplanDetailComponent } from './asignacionplan-detail/asignacionplan-detail.component';

import { AsignacionplanAllComponent } from './asignacionplan-all/asignacionplan-all.component';
import { LayoutModule} from '@angular/cdk/layout';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [

      
    AsignacionplanDetailComponent,

    AsignacionplanAllComponent
      
  ],
  imports: [
    CommonModule,
    AsignacionplanRoutingModule,
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
export class AsignacionplanModule { }
