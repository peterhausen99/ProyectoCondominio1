import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { PlanDiagComponent } from '../plan-diag/plan-diag.component';

@Component({
  selector: 'app-plan-index',
  templateUrl: './plan-index.component.html',
  styleUrls: ['./plan-index.component.css']
})
export class PlanIndexComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean>=new Subject<boolean>();
  constructor(private gService:GenericService,
    private notificacion:NotificacionService,
    private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog
    ) { 
    this.listaPlans();
  }

  ngOnInit(): void {
  }
  listaPlans(){
    //Llamar al API, nombre de ruta
    this.gService.list('plan/')
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
    });
  }
  detallePlan(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      id:id
    }
    this.dialog.open(PlanDiagComponent,dialogConfig)
  }
  
  comprar(id:number){
    this.notificacion.mensaje('Orden',
    'Plan agregado',TipoMessage.success);
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
