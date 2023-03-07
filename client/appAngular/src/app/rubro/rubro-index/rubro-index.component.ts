import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-index',
  templateUrl: './rubro-index.component.html',
  styleUrls: ['./rubro-index.component.css']
})
export class RubroIndexComponent implements AfterViewInit {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  dataSource=new MatTableDataSource<any>();

  //Columnas que se muestran
  displayedColumns=['descripcion','valor','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute, private gService:GenericService
    ) { }

  ngAfterViewInit(): void {
    this.listaRubros();
  }

  listaRubros(){
    //Llamar al API, nombre de ruta
    this.gService.list('rubro/')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource=new MatTableDataSource(this.datos);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
    });
  }
  detalleRubro(id:number){
    this.router.navigate(['/rubro',id],{
      relativeTo:this.route
    });
  }

  crearRubro(){
    this.router.navigate(['/rubro/create'], {relativeTo:this.route})
  }
  actualizarRubro(id:number){
    this.router.navigate(['/rubro/update',id], {relativeTo:this.route})
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
