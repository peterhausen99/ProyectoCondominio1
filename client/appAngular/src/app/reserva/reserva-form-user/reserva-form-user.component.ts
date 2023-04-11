import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-reserva-form-user',
  templateUrl: './reserva-form-user.component.html',
  styleUrls: ['./reserva-form-user.component.css'],
})
export class ReservaFormUserComponent implements OnInit {
  fecha = Date.now();
  reservaForm: FormGroup;
  areaComunList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate: boolean = true;
  idReserva: number = 0;
  titleForm: string = 'Crear';
  reservaInfo: any;
  reservaList: any;
  areaComunList2:[];

  constructor(
    private notificacion:NotificacionService,
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formularioReactive();
    this.listaAreaComun();
    this.listaReservas();
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
    this.listaAreaComun();
    this.listaReservas();
  } //cierra oninit

  //Crear el formulario
  formularioReactive() {
    this.reservaForm = this.fb.group({
      id: [null, null],
      idUsuario: [null, null],
      idAreaComun: [null, null],
      horario: [null, null],
      detalles: ['No indica', null],
      estado: ['Pendiente', null],
      diaReservacion: [null, null],
    });
  } //cierra formulario

  listaAreaComun() {
    this.areaComunList = null;
    this.gService
      .list('areacomun/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.areaComunList = data;
      });


  }

  listaReservas() {
    this.reservaList = null;
    this.gService
      .list('reserva/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.reservaList = data;
      });
  }

  buscarReserva():boolean {
    let valor: boolean;
    let areaComunForm:any = this.reservaForm.get('idAreaComun').value;
    let horarioForm:any = this.reservaForm.get('horario').value;
    let diaReservacionForm:Date = this.reservaForm.get('diaReservacion').value;
    diaReservacionForm.setHours(0,0,0,0)
    if (this.reservaList != null) {
      this.reservaList.every((item) =>{
        let diaReservacionB:any = item.diaReservacion;
        let fechaB= new Date(diaReservacionB);
        fechaB.setHours(0,0,0,0)
        //let dia= fechaB.getDate()+1;
        //fechaB.setDate(dia);
        if ( (item.idAreaComun == areaComunForm) && (item.horario === horarioForm) && (diaReservacionForm.getTime()==fechaB.getTime()) ) {
          valor=true;
          return false;
        } 
        else {
        valor=false;
        return true;}
      });
    }
    
    return valor;
  }//cierra buscar


  //Crear reserva
  crearReserva() {


    if (this.buscarReserva()==true){

      this.notificacion.mensaje('Reserva',`El Área común elegida ya se encuentra ocupada para ese día y horario`,TipoMessage.success);
      return;
    }
    else{
      
    if (this.reservaForm.invalid) {
      return;
    }
    console.log(this.reservaForm.value);
    //Llamar al API y enviar la informacion
    this.gService
      .create('reserva', this.reservaForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/'], {
          queryParams: { create: 'true' },
        });
      });
      this.notificacion.mensaje('Reserva',`La reserva se encuentra en tramite`,TipoMessage.success);
    }
  } //cierra crear reserva





  //Actualizar reserva
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
  } //cierra actualizar reserva

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
