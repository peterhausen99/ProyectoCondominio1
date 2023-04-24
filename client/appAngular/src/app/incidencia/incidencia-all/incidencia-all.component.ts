import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-incidencia-all',
  templateUrl: './incidencia-all.component.html',
  styleUrls: ['./incidencia-all.component.css']
})
export class IncidenciaAllComponent implements AfterViewInit {

  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  dataSource=new MatTableDataSource<any>();

  //Columnas que se muestran
  displayedColumns=['id','usuario','titulo','estado','fecha','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute, private gService:GenericService
    ) { }

    ngAfterViewInit(): void {
      this.listaIncidencias();
    }

    filtrar(event: Event) {
      const filtro = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filtro.trim().toLowerCase();
    }  

    listaIncidencias(){
      //Llamar al API, nombre de ruta
      this.gService.list('incidencia/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
          console.log(data);
          this.datos=data;
          this.dataSource=new MatTableDataSource(this.datos);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator=this.paginator;
      });
    }


    detalleIncidencia(id:number){
      this.router.navigate(['/incidencia',id],{
        relativeTo:this.route
      });
    }


    crearIncidencia(){
      this.router.navigate(['/incidencia/create'],{
        relativeTo:this.route
      })
     }
     actualizarIncidencia(id: number){
      this.router.navigate(['/incidencia/update',id],{
        relativeTo:this.route
      })
     }


    ngOnDestroy(){
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }









}//cierra clase
