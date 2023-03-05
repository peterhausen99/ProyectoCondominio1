import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-residencia-index',
  templateUrl: './residencia-index.component.html',
  styleUrls: ['./residencia-index.component.css']
})
export class ResidenciaIndexComponent implements OnInit{
  datos:any;
  destroy$: Subject <boolean>= new Subject<boolean>();

  constructor(private gService:GenericService,
    private notificacion:NotificacionService) {
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

  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
