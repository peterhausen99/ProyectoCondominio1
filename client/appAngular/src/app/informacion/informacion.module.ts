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
    InformacionRoutingModule,
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
export class InformacionModule { }
