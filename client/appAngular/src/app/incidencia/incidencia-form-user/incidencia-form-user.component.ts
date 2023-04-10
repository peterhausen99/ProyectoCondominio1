import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-incidencia-form-user',
  templateUrl: './incidencia-form-user.component.html',
  styleUrls: ['./incidencia-form-user.component.css'],
})
export class IncidenciaFormUserComponent implements OnInit {
  fecha = Date.now();
  incidenciaForm: FormGroup;

  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate: boolean = true;
  idIncidencia: number = 0;
  titleForm: string = 'Crear';
  incidenciaInfo: any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.route.params.subscribe((params: Params) => {
      this.idIncidencia = params['id'];
      if (this.idIncidencia != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        //Obtener incidencia a actualizar del API
        this.gService
          .get('incidencia', this.idIncidencia)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.incidenciaInfo = data;
            this.incidenciaForm.setValue({
              id: this.incidenciaInfo.id,
              idUsuario: this.incidenciaInfo.idUsuario,
              titulo: this.incidenciaInfo.titulo,
              descripcion: this.incidenciaInfo.descripcion,
              estado: this.incidenciaInfo.estado,
              fecha: this.incidenciaInfo.fecha,
            });
          });
      }
    });
  } //cierra oninit

  //Crear el formulario
  formularioReactive() {
    this.incidenciaForm = this.fb.group({
      id: [null, null],
      idUsuario: [null, Validators.required],
      titulo: [null, Validators.compose([
                                        Validators.required,
                                        Validators.minLength(5),
                                        Validators.maxLength(40),
      ])],
      descripcion: [null, Validators.compose([
                                              Validators.required,
                                              Validators.minLength(5),
                                              Validators.maxLength(200),
])],
      estado: ["Abierto", Validators.required],
      fecha: [new Date(this.fecha), null],
    });
  }//cierra formulario

  //Crear incidencia
  crearIncidencia() {
    if (this.incidenciaForm.invalid) {
      return;
    }
    console.log(this.incidenciaForm.value);
    //Llamar al API y enviar la infomracion
    this.gService
      .create('incidencia', this.incidenciaForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/'], {
          queryParams: { create: 'true' },
        });
      });
  } //cierra crear incidencia

  //Actualizar incidencia
  actualizarIncidencia() {
    //Verificar validación
    if (this.incidenciaForm.invalid) {
      return;
    }
    console.log(this.incidenciaForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('incidencia', this.incidenciaForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        console.log(data);
        this.router.navigate(['/incidencia/all'], {
          queryParams: { update: 'true' },
        });
      });
  } //cierra actualizar incidencia

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
