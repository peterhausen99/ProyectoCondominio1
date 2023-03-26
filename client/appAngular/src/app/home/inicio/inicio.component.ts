import { Component , OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  datos1:any;
  datos2:any;
  datos3:any;
  destroy$: Subject <boolean>= new Subject<boolean>();

  constructor(private gService:GenericService,
    private notificacion:NotificacionService,
    private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog
    ) { 
    this.listaAviso();
    this.listaNoticia();
    this.listaArchivo();
  }

  ngOnInit(): void {
  }

  listaAviso(){
    //Llamar al API, nombre de ruta
    this.gService.list('informacion/aviso')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data1:any)=>{
      console.log(data1);
      this.datos1=data1;
    });
  }

  listaNoticia(){
    //Llamar al API, nombre de ruta
    this.gService.list('informacion/noticia')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data2:any)=>{
      console.log(data2);
      this.datos2=data2;
    });
  }

  listaArchivo(){
    //Llamar al API, nombre de ruta
    this.gService.list('informacion/archivo')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data3:any)=>{
      console.log(data3);
      this.datos3=data3;
    });
  }






  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }






}