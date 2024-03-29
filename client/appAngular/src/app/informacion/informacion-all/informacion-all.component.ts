import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-informacion-all',
  templateUrl: './informacion-all.component.html',
  styleUrls: ['./informacion-all.component.css']
})
export class InformacionAllComponent implements AfterViewInit {

  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  dataSource=new MatTableDataSource<any>();

  //Columnas que se muestran
  displayedColumns=['id','titulo','tipo','estado','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute, private gService:GenericService
    ) { }

    ngAfterViewInit(): void {
      this.listaInformacion();
    }


    
    listaInformacion(){
      //Llamar al API, nombre de ruta
      this.gService.list('informacion/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
          console.log(data);
          this.datos=data;
          this.dataSource=new MatTableDataSource(this.datos);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator=this.paginator;
      });
    }


    detalleInformacion(id:number){
      this.router.navigate(['/informacion',id],{
        relativeTo:this.route
      });
    }


    crearInformacion(){
      this.router.navigate(['/informacion/create'],{
        relativeTo:this.route
      })
     }
     actualizarInformacion(id: number){
      this.router.navigate(['/informacion/update',id],{
        relativeTo:this.route
      })
     }

}//cierra clase
