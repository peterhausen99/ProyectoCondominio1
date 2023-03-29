import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-rubro-form',
  templateUrl: './rubro-form.component.html',
  styleUrls: ['./rubro-form.component.css']
})
export class RubroFormComponent implements OnInit{
  rubroForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate:boolean=true;
  idRubro:number=0;
  titleForm:string='Crear';
  rubroInfo:any;

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
      this.idRubro=params['id'];
      if(this.idRubro!=undefined){
        this.isCreate=false;
        this.titleForm="Actualizar";
         //Obtener rubro a actualizar del API
         this.gService.get('rubro',this.idRubro).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.rubroInfo=data;
          this.rubroForm.setValue({
            id:this.rubroInfo.id,
            descripcion:this.rubroInfo.descripcion,
            valor:this.rubroInfo.valor,
            estado:this.rubroInfo.estado,
          })
         });
      }

    });
  }//cierra oninit
  //Crear el formulario
  formularioReactive() {
    this.rubroForm = this.fb.group({
      id: [null, null],
      descripcion: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ]),
      ],
      valor: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*(.[0-9]{0,2})?$'),
        ]),
      ],
      estado: [true, Validators.required],
    });
  }

  //Crear Rubro
  crearRubro() {
    if (this.rubroForm.invalid) {
      return;
    }
   
    console.log(this.rubroForm.value);
    //Llamar al API y enviar la infomracion
    this.gService
      .create('rubro', this.rubroForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/rubro'], {
          queryParams: { create: 'true' },
        });
      });
  }

  //Actualizar Rubro
  actualizarRubro(){
    
    //Verificar validación
    if(this.rubroForm.invalid){
      return;
    }
    console.log(this.rubroForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('rubro',this.rubroForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      console.log(data);
      this.router.navigate(['/rubro'],{
        queryParams: {update:'true'}
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
