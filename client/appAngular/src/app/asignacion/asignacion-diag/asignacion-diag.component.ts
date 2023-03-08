import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-asignacion-diag',
  templateUrl: './asignacion-diag.component.html',
  styleUrls: ['./asignacion-diag.component.css']
})
export class AsignacionDiagComponent implements OnInit {
  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<AsignacionDiagComponent>
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      this.obtenerAsignacion(this.datosDialog.id);
    }
  }
  obtenerAsignacion(id: any) {
    this.gService
      .get('asignacion', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }
  close(){
    //this.form.value
    this.dialogRef.close();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
