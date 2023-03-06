import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-residencia-diag',
  templateUrl: './residencia-diag.component.html',
  styleUrls: ['./residencia-diag.component.css']
})
export class ResidenciaDiagComponent implements OnInit{
  datos: any;
  datosDialog: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<ResidenciaDiagComponent>
  ) {
    this.datosDialog = data;
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      this.obtenerResidencia(this.datosDialog.id);
    }
  }

  obtenerResidencia(id: any) {
    this.gService
      .get('residencia', id)
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
