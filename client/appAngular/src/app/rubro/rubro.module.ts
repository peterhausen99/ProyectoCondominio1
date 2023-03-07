import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RubroRoutingModule } from './rubro-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RubroIndexComponent } from './rubro-index/rubro-index.component';
import {MatDividerModule} from '@angular/material/divider';
import {LayoutModule} from '@angular/cdk/layout';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { RubroFormComponent } from './rubro-form/rubro-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { RubroDiagComponent } from './rubro-diag/rubro-diag.component';
import { RubroDetailComponent } from './rubro-detail/rubro-detail.component';



@NgModule({
  declarations: [
    RubroIndexComponent,
    RubroDiagComponent,
    RubroFormComponent,
    RubroDetailComponent,
  ],
  imports: [
    CommonModule,
    RubroRoutingModule,
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
export class RubroModule { }
