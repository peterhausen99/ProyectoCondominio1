import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';


@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css']
})
export class PlanFormComponent implements OnInit {
  planForm: FormGroup;
  rubrosList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isCreate:boolean=true;
  idPlan:number=0;
  titleForm:string='Crear';
  planInfo:any;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formularioReactive();
    this.listaRubros();
   
  }

  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.route.params.subscribe((params:Params)=>{
      this.idPlan=params['id'];
      if(this.idPlan!=undefined){
        this.isCreate=false;
        this.titleForm="Actualizar";
         //Obtener plan a actualizar del API
         this.gService.get('plan',this.idPlan).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.planInfo=data;
          this.planForm.setValue({
            id:this.planInfo.id,
            descripcion:this.planInfo.descripcion,
            totalPlan:this.planInfo.totalPlan,
            rubros:this.planInfo.rubros.map(({id}) => id)
          })
         });
      }

    });
  }
  //Crear el formulario
  formularioReactive() {
    this.planForm = this.fb.group({
      id: [null, null],
      descripcion: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ]),
      ],
      totalPlan: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*(.[0-9]{0,2})?$'),
        ]),
      ],
      rubros: [null, Validators.required],
    });
  }
  listaRubros() {
    this.rubrosList = null;
    this.gService
      .list('rubro')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.rubrosList = data;
      });
  }
  //Crear Plan
  crearPlan() {
    if (this.planForm.invalid) {
      return;
    }
    //Obtener los rubros del Formulario y crear el arreglo para el API
    //[{id:value}]
    let gFormat: any = this.planForm
      .get('rubros')
      .value.map((x) => ({ ['id']: x }));
    //Asignar al valor del formulario
    this.planForm.patchValue({ rubros: gFormat });
    console.log(this.planForm.value);
    //Llamar al API y enviar la infomracion
    this.gService
      .create('plan', this.planForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/plan/all'], {
          queryParams: { create: 'true' },
        });
      });
  }

  //Actualizar Plan
  actualizarPlan(){
    
    //Verificar validación
    if(this.planForm.invalid){
      return;
    }
    
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.planForm.get('rubros').value.map(x=>({['id']: x }));
    //Asignar valor al formulario 
    this.planForm.patchValue({ rubros:gFormat});
    console.log(this.planForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('plan',this.planForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      console.log(data);
      this.router.navigate(['/plan/all'],{
        queryParams: {update:'true'}
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}