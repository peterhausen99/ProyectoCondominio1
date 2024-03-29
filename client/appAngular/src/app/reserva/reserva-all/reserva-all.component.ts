import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-reserva-all',
  templateUrl: './reserva-all.component.html',
  styleUrls: ['./reserva-all.component.css']
})
export class ReservaAllComponent implements AfterViewInit {

  reservaInfo:any=null;
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  dataSource=new MatTableDataSource<any>();

//Columnas que se muestran
displayedColumns=['id','usuario','areaComun','diaReservacion','estado','acciones'];

constructor(
  private notificacion:NotificacionService,
  private router:Router,
  private route:ActivatedRoute, 
  private gService:GenericService
  ) { }

  ngAfterViewInit(): void {
    this.listaReservas();
  }


  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  



  listaReservas(){
    //Llamar al API, nombre de ruta
    this.gService.list('reserva/')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;

        this.dataSource=new MatTableDataSource(this.datos);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
    });
  }

 

  detalleReserva(id:number){
    this.router.navigate(['/reserva',id],{
      relativeTo:this.route
    });
  }

  actualizarReserva(id: number){

    this.gService.get('reserva', id).pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.reservaInfo=data;
    });

    if(this.reservaInfo.estado=="Pendiente"){
      this.router.navigate(['/reserva/update',id],{
        relativeTo:this.route
      })
    }
    else{
      this.notificacion.mensaje('Reserva',`La reserva elegida ya fue "${this.reservaInfo.estado}" y no se puede modificar`,TipoMessage.success);
      return;
    }

   }//cierra actualizarReserva


   ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
