import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-informacion-form',
  templateUrl: './informacion-form.component.html',
  styleUrls: ['./informacion-form.component.css']
})
export class InformacionFormComponent implements OnInit {
  fecha = Date.now();

  informacionForm: FormGroup;

  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate:boolean=true;
  idinformacion:number=0;
  titleForm:string='Crear';
  informacionInfo:any;

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
    this.route.params.subscribe((params:Params)=>{
      this.idinformacion=params['id'];
      if(this.idinformacion!=undefined){
        this.isCreate=false;
        this.titleForm="Actualizar";
         //Obtener videojuego a actualizar del API
         this.gService.get('incidencia',this.idinformacion).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.informacionInfo=data;
          this.informacionForm.setValue({
            id:this.informacionInfo.id,
            titulo:this.informacionInfo.titulo,
            mensaje:this.informacionInfo.mensaje,
            estado:this.informacionInfo.estado,
          })
         });
      }

    });
  }//cierra oninit









   //Crear el formulario
   formularioReactive() {
    this.informacionForm = this.fb.group({
      id: [null, null],
      titulo: [null, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ])],
      mensaje: [null, Validators.required],
      estado: [null, null],
      

    });
  }//cierra formulario








  

  //Crear incidencia
  crearInformacion() {
    if (this.informacionForm.invalid) {
      return;
    }
   
    console.log(this.informacionForm.value);
    //Llamar al API y enviar la infomracion
    this.gService
      .create('informacion', this.informacionForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/informacion/all'], {
          queryParams: { create: 'true' },
        });
      });
  }//cierra crear incidencia












   //Actualizar incidencia
   actualizarInformacion(){
    //Verificar validación
    if(this.informacionForm.invalid){
      return;
    }
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
   // let gFormat:any=this.incidenciaForm.get('generos').value.map(x=>({['id']: x }));
    //Asignar valor al formulario 
    //this.incidenciaForm.patchValue({ generos:gFormat});
    console.log(this.informacionForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('informacion',this.informacionForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      console.log(data);
      this.router.navigate(['/informacion/all'],{
        queryParams: {update:'true'}
      });
    });
  }//cierra actualizar incidencia



  





ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}


}
