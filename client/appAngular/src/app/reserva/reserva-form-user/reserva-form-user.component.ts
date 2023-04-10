import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-reserva-form-user',
  templateUrl: './reserva-form-user.component.html',
  styleUrls: ['./reserva-form-user.component.css']
})
export class ReservaFormUserComponent implements OnInit {

  fecha = Date.now();
  reservaForm: FormGroup;
  areaComunList:any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate: boolean = true;
  idReserva: number = 0;
  titleForm: string = 'Crear';
  reservaInfo: any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formularioReactive();
    this.listaAreaComun();
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
          .get('reserva', this.idReserva)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.reservaInfo = data;
            this.reservaForm.setValue({
              id: this.reservaInfo.id,
              idUsuario: this.reservaInfo.idUsuario,
              idAreaComun: this.reservaInfo.idAreaComun,
             detalles: this.reservaInfo.detalles,
             estado: this.reservaInfo.estado,
             diaReservacion: this.reservaInfo.diaReservacion,
             horario: this.reservaInfo.horario,
            });
          });
      }
    });
  } //cierra oninit




  //Crear el formulario
  formularioReactive() {
    this.reservaForm = this.fb.group({
      id: [null, null],
      idUsuario: [null, null],
      idAreaComun: [null, null],
      horario: [null, null],
     detalles: ["No indica", null],
     estado: ["Pendiente", null],
     diaReservacion: [null, null],
    });
  }//cierra formulario


  listaAreaComun() {
    this.areaComunList = null;
    this.gService
      .list('areacomun')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.areaComunList = data;
      });
  }




   //Crear incidencia
   crearReserva() {
    if (this.reservaForm.invalid) {
      return;
    }
    console.log(this.reservaForm.value);
    //Llamar al API y enviar la infomracion
    this.gService
      .create('reserva', this.reservaForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/'], {
          queryParams: { create: 'true' },
        });
      });
  } //cierra crear incidencia


  //Actualizar incidencia
  actualizarReserva() {
    //Verificar validación
    if (this.reservaForm.invalid) {
      return;
    }
    console.log(this.reservaForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('reserva', this.reservaForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        console.log(data);
        this.router.navigate(['/reserva/all'], {
          queryParams: { update: 'true' },
        });
      });
  } //cierra actualizar incidencia

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
