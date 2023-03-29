import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { ResidenciaDiagComponent } from '../residencia-diag/residencia-diag.component';

@Component({
  selector: 'app-residencia-index',
  templateUrl: './residencia-index.component.html',
  styleUrls: ['./residencia-index.component.css']
})
export class ResidenciaIndexComponent implements OnInit{
  datos:any;
  destroy$: Subject <boolean>= new Subject<boolean>();

  constructor(private gService:GenericService,
    private notificacion:NotificacionService,
    private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog
    ) { 
    this.listaResidencias();
  }

   ngOnInit(): void {
  }

  listaResidencias(){
    //Llamar al API, nombre de ruta
    this.gService.list('residencia/')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      this.datos=data;
    });
  }

  detalleResidencia(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      id:id
    }
    this.dialog.open(ResidenciaDiagComponent,dialogConfig)
  }

  crearResidencia(){
    this.router.navigate(['/residencia/create'],{
      relativeTo:this.route
    })
   }
   actualizarResidencia(id: number){
    this.router.navigate(['/residencia/update',id],{
      relativeTo:this.route
    })
   }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
