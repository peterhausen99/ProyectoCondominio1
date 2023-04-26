import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-residencia-form',
  templateUrl: './residencia-form.component.html',
  styleUrls: ['./residencia-form.component.css']
})
export class ResidenciaFormComponent implements OnInit{
  residenciaForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate:boolean=true;
  idResidencia:number=0;
  titleForm:string='Crear';
  residenciaInfo:any;
  usuariosList:any;

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
      this.idResidencia=params['id'];
      if(this.idResidencia!=undefined){
        this.isCreate=false;
        this.titleForm="Actualizar";
         //Obtener residencia a actualizar del API
         this.gService.get('residencia',this.idResidencia).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.residenciaInfo=data;
          this.residenciaForm.setValue({
            id:this.residenciaInfo.id,
            idUsuario: this.residenciaInfo.idUsuario,
            cantidadPersonas: this.residenciaInfo.cantidadPersonas,
            estado: this.residenciaInfo.estado,
            cantidadCarros: this.residenciaInfo.cantidadCarros
          })
         });
      }

    });
    this.listaUsuarios();
  }//cierra oninit
  //Crear el formulario
  formularioReactive() {
    this.residenciaForm = this.fb.group({
      id: [null, null],
      idUsuario: [null, Validators.required],
      cantidadPersonas: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]$'),
        ]),
      ],
      estado:[null, Validators.required],
      cantidadCarros: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-5]$'),
        ]),
      ],
    });
  }

  //Crear Residencia
  crearResidencia() {
    if (this.residenciaForm.invalid) {
      return;
    }
   
    console.log(this.residenciaForm.value);
    //Llamar al API y enviar la infomracion
    this.gService
      .create('residencia', this.residenciaForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/residencia/all'], {
          queryParams: { create: 'true' },
        });
      });
  }
  listaUsuarios(){
    this.usuariosList = null;
    this.gService
      .list('usuario/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.usuariosList = data;
      });
  }


  //Actualizar Residencia
  actualizarResidencia(){
    
    //Verificar validación
    if(this.residenciaForm.invalid){
      return;
    }
    console.log(this.residenciaForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('residencia',this.residenciaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      console.log(data);
      this.router.navigate(['/residencia/all'],{
        queryParams: {update:'true'}
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
