import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';




@Component({
  selector: 'app-asignacionplan-detail',
  templateUrl: './asignacionplan-detail.component.html',
  styleUrls: ['./asignacionplan-detail.component.css']
})
export class AsignacionplanDetailComponent implements OnInit{

  datosPendiente:any;
  datosPago:any;
  datosResidencia:any;

  destroy$:Subject<boolean>=new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  dataSourcePendiente=new MatTableDataSource<any>();
  dataSourcePago=new MatTableDataSource<any>();

  //Columnas que se muestran
  displayedColumns=['mes','estado','monto','plan','Detalle Plan'];

  constructor(private router:Router, private route:ActivatedRoute, private gService:GenericService) {
    let id = route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerPendientes(Number(id));
      this.obtenerPagos(Number(id));
      this.obtenerResidencia(Number(id));
    }

   }



    ngOnInit(): void { }


    obtenerPendientes(id: any) {
      this.gService
        .get('asignacionplan/pendiente', id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log(data);
          this.datosPendiente = data;
          this.dataSourcePendiente=new MatTableDataSource(this.datosPendiente);
          this.dataSourcePendiente.sort=this.sort;
          this.dataSourcePendiente.paginator=this.paginator;
        });
    }

    obtenerPagos(id: any) {
      this.gService
        .get('asignacionplan/pago', id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log(data);
          this.datosPago = data;
          this.dataSourcePago=new MatTableDataSource(this.datosPago);
          this.dataSourcePago.sort=this.sort;
          this.dataSourcePago.paginator=this.paginator;
        });
    }


    obtenerResidencia(id: any) {
      this.gService
        .get('residencia', id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log(data);
          this.datosResidencia = data;
        });
    }


    detallePlan(id:any){
      this.router.navigate(['/plan',id],{
        relativeTo:this.route
      });
    }
    


    ngOnDestroy(){
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }










}//cierra class
