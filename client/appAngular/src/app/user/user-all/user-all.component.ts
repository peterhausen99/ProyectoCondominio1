import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css']
})
export class UserAllComponent implements AfterViewInit{

  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  dataSource=new MatTableDataSource<any>();

  //Columnas que se muestran
  displayedColumns=['idUsuario','nombre','correo','perfilUsuario','estado','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute, private gService:GenericService
    ) { }

    ngAfterViewInit(): void {
      this.listaUsuarios();
    }

    listaUsuarios(){
      //Llamar al API, nombre de ruta
      this.gService.list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
          console.log(data);
          this.datos=data;
          this.dataSource=new MatTableDataSource(this.datos);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator=this.paginator;
      });
    }


    crearUsuario(){
      this.router.navigate(['/usuario/create'],{
        relativeTo:this.route
      })
     }
     actualizarUsuario(id: number){
      this.router.navigate(['/usuario/update',id],{
        relativeTo:this.route
      })
     }


    ngOnDestroy(){
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }

}//cierra todo
