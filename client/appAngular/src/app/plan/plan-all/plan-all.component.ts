import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-plan-all',
  templateUrl: './plan-all.component.html',
  styleUrls: ['./plan-all.component.css']
})
export class PlanAllComponent implements AfterViewInit {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  dataSource=new MatTableDataSource<any>();

  //Columnas que se muestran
  displayedColumns=['descripcion','totalPlan','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute, private gService:GenericService
    ) { }

  ngAfterViewInit(): void {
    this.listaPlans();
  }

  listaPlans(){
    //Llamar al API, nombre de ruta
    this.gService.list('plan/')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource=new MatTableDataSource(this.datos);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
    });
  }
  detallePlan(id:number){
    this.router.navigate(['/plan',id],{
      relativeTo:this.route
    });
  }

  crearPlan(){
    this.router.navigate(['/plan/create'], {relativeTo:this.route})
  }
  actualizarPlan(id:number){
    this.router.navigate(['/plan/update',id], {relativeTo:this.route})
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
