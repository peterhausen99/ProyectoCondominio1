import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-asignacionplan-all',
  templateUrl: './asignacionplan-all.component.html',
  styleUrls: ['./asignacionplan-all.component.css']
})
export class AsignacionplanAllComponent implements AfterViewInit{
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  dataSource=new MatTableDataSource<any>();
  
//Columnas que se muestran
displayedColumns=['id','usuario','acciones'];

constructor(private router:Router,
  private route:ActivatedRoute, private gService:GenericService
  ) { }

  ngAfterViewInit(): void {
    this.listaResidencia();
  }

  listaResidencia(){
    //Llamar al API, nombre de ruta
    this.gService.list('residencia/')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource=new MatTableDataSource(this.datos);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
    });
  }

  detalleAsignacionID(id:number){
    this.router.navigate(['/asignacionplan',id],{
      relativeTo:this.route
    });
  }
  agregarPlan(id:number){
    this.router.navigate(['/asignacionplan/create',id],{
      relativeTo:this.route
    });
  }

  detallePago(id:number){
    this.router.navigate(['/asignacionplan/pago',id],{
      relativeTo:this.route
    });
  }

  detallePendiente(id:number){
    this.router.navigate(['/asignacionplan/pendiente/',id],{
      relativeTo:this.route
    });
  }

  

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}//cierra export class AsignacionplanAllComponent
