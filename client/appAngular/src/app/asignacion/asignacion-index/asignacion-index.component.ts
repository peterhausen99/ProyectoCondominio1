import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { AsignacionDiagComponent } from '../asignacion-diag/asignacion-diag.component';

@Component({
  selector: 'app-asignacion-index',
  templateUrl: './asignacion-index.component.html',
  styleUrls: ['./asignacion-index.component.css']
})
export class AsignacionIndexComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean>=new Subject<boolean>();
  constructor(private gService:GenericService,
    private notificacion:NotificacionService,
    private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog
    ) { 
    this.listaAsignacions();
  }

  ngOnInit(): void {
  }
  listaAsignacions(){
    //Llamar al API, nombre de ruta
    this.gService.list('asignacion/')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
    });
  }
  detalleAsignacion(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      id:id
    }
    this.dialog.open(AsignacionDiagComponent,dialogConfig)
  }
  comprar(id:number){
    this.notificacion.mensaje('Orden',
    'Asignacion agregado',TipoMessage.success);
  }


  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
