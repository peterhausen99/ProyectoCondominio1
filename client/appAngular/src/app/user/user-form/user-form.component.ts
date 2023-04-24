import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{
  isCreate: boolean = true;
  titleForm:string='Crear';
  hide = true;
  usuario: any;
  idUsuario: number = 0;
  perfilUsuarioList: any;
  usuarioForm: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  usuarioInfo: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.formularioReactive();
    this.getPerfiles();
  }


  formularioReactive() {
    this.usuarioForm = this.fb.group({
      idUsuario: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      apellido1: [null, [Validators.required]],
      apellido2: [null, [Validators.required]],
      correo: [null, [Validators.required]],
      telefono: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      contrasenna: [null, [Validators.required]],
      perfilUsuarioId: [null, [Validators.required]],
    });
   
  }

  ngOnInit(): void {

   
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.route.params.subscribe((params: Params) => {
      this.idUsuario = params['id'];
      if (this.idUsuario != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        //Obtener incidencia a actualizar del API
        this.gService
          .get('usuario', this.idUsuario)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.usuarioInfo = data;
            this.usuarioForm.setValue({
              idUsuario: this.usuarioInfo.idUsuario,
              nombre: this.usuarioInfo.nombre,
              apellido1: this.usuarioInfo.apellido1,
              apellido2: this.usuarioInfo.apellido2,
              correo: this.usuarioInfo.correo,
              telefono: this.usuarioInfo.telefono,
              estado: this.usuarioInfo.estado,
              contrasenna: this.usuarioInfo.contrasenna,
              perfilUsuarioId: this.usuarioInfo.perfilUsuarioId             
            });
          });
      }
    });
  }
  /*submitForm() {
    this.makeSubmit=true;
    //Validación
    if(this.formCreate.invalid){
     return;
    }
    this.authService.createUser(this.formCreate.value)
    .subscribe((respuesta:any)=>{
      this.usuario=respuesta;
      this.router.navigate(['/usuario/login'],{
        //Mostrar un mensaje
        queryParams:{register:'true'},
      })
    })
  }*/


 //Crear 
 crearUsuario() {
  if (this.usuarioForm.invalid) {
    return;
  }
 
  console.log(this.usuarioForm.value);
  //Llamar al API y enviar la infomracion
  this.gService
    .create('usuario', this.usuarioForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/usuario/all'], {
        queryParams: { create: 'true' },
      });
    });
}//cierra crear 



  onReset() {
    this.usuarioForm.reset();
  }

  actualizarUsuario() {
    //Verificar validación
    if (this.usuarioForm.invalid) {
      return;
    }
    console.log(this.usuarioForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService
      .update('usuario', this.usuarioForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Obtener respuesta
        console.log(data);
        this.router.navigate(['/usuario/all'], {
          queryParams: { update: 'true' },
        });
      });
  }

  getPerfiles() {
    this.gService
      .list('perfilUsuario')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.perfilUsuarioList = data;
        console.log( this.perfilUsuarioList);
      });
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.usuarioForm.controls[control].hasError(error) &&
      this.usuarioForm.controls[control].invalid &&
      (this.makeSubmit || this.usuarioForm.controls[control].touched)
    );
  };

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
