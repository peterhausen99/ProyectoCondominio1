import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-asignacionplan-create',
  templateUrl: './asignacionplan-create.component.html',
  styleUrls: ['./asignacionplan-create.component.css']
})
export class AsignacionplanCreateComponent implements OnInit{

  fecha = Date.now();
  asignacionPlanForm: FormGroup;
  residenciaList: any;
  planList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate: boolean = true;
  idReserva: number = 0;
  titleForm: string = 'Crear';
  reservaInfo: any;
  

  constructor(
    private notificacion:NotificacionService,
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formularioReactive();
    this.listaResidencias();
    this.listaPlanes();
  }


  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.route.params.subscribe((params: Params) => {
      this.idReserva = params['id'];
      if (this.idReserva != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        //Obtener incidencia a actualizar del API
        this.gService
          .get('asignacionPlan', this.idReserva)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.reservaInfo = data;
            this.asignacionPlanForm.setValue({
              idResidencia: this.reservaInfo.idResidencia,
              idPlan: this.reservaInfo.idPlan,
              mes: this.reservaInfo.mes,
              estado: "Pendiente",
              iva: this.reservaInfo.iva,
              total: this.reservaInfo.total,
            });
          });
      }
    });
    this.listaResidencias();
    this.listaPlanes();
  } //cierra oninit


   //Crear el formulario
   formularioReactive() {
    this.asignacionPlanForm = this.fb.group({
      idResidencia: [null, Validators.required],
      idPlan: [null, Validators.required],
      mes: [null, Validators.required],
      
    });
  } //cierra formulario


  listaResidencias() {
    this.residenciaList = null;
    this.gService
      .list('residencia/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.residenciaList = data;
      });


  }


  listaPlanes() {
    this.planList = null;
    this.gService
      .list('plan/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.planList = data;
      });
  }

  //Crear asignacionPlan
  crearAsignacionPlan() {
    console.log(this.asignacionPlanForm.value);
    //Llamar al API y enviar la informacion
    this.gService
      .create('asignacionPlan', this.asignacionPlanForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/'], {
          queryParams: { create: 'true' },
        });
      });
      this.notificacion.mensaje('AsignacionPlan',`La asignacionPlan se encuentra en tramite`,TipoMessage.success);
    }
  //cierra crear asignacionPlan

   //Actualizar asignacionPlan

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
