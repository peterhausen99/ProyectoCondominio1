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
  datos:any;
  destroy$: Subject <boolean>= new Subject<boolean>();

  constructor(private gService:GenericService,
    private notificacion:NotificacionService,
    private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog
    ) { 
    this.listaInformacion();
  }

  ngOnInit(): void {
  }

  listaInformacion(){
    //Llamar al API, nombre de ruta
    this.gService.list('informacion/')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      this.datos=data;
    });
  }


  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }






}