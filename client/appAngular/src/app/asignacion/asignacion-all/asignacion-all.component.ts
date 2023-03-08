import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';


@Component({
  selector: 'app-asignacion-all',
  templateUrl: './asignacion-all.component.html',
  styleUrls: ['./asignacion-all.component.css']
})
export class AsignacionAllComponent implements AfterViewInit {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  dataSource=new MatTableDataSource<any>();

  //Columnas que se muestran
  displayedColumns=['descripcion','totalAsignacion','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute, private gService:GenericService
    ) { }

  ngAfterViewInit(): void {
    this.listaAsignacions();
  }

  listaAsignacions(){
    //Llamar al API, nombre de ruta
    this.gService.list('asignacion/')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource=new MatTableDataSource(this.datos);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
    });
  }
  detalleAsignacion(id:number){
    this.router.navigate(['/asignacion',id],{
      relativeTo:this.route
    });
  }

  crearAsignacion(){
    this.router.navigate(['/asignacion/create'], {relativeTo:this.route})
  }
  actualizarAsignacion(id:number){
    this.router.navigate(['/asignacion/update',id], {relativeTo:this.route})
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
