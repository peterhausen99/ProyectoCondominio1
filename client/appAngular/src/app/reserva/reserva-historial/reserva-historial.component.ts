import { AfterViewInit, Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { MatInputModule } from '@angular/material/input'
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-reserva-historial',
  templateUrl: './reserva-historial.component.html',
  styleUrls: ['./reserva-historial.component.css']
})
export class ReservaHistorialComponent implements AfterViewInit{
 
  id:any;
  currentUser: any;
  reservaInfo:any=null;
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  dataSource=new MatTableDataSource<any>();

//Columnas que se muestran
displayedColumns=['id','areaComun','diaReservacion','estado','acciones'];

constructor(
  private notificacion:NotificacionService,
  private router:Router,
  private route:ActivatedRoute, 
  private gService:GenericService,
  private authService: AuthenticationService
  ) { }

  ngAfterViewInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.id=this.currentUser.usuario.idUsuario;
    this.listaReservas(this.id);
  }

 



  listaReservas(id:number){
    //Llamar al API, nombre de ruta
    this.gService.get('reserva/historial',id)
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




   ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
