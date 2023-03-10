import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  constructor(private gService:GenericService, 
    private route:ActivatedRoute) {

    let id=route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.obtenerPlan(Number(id))
      }

   }

  ngOnInit(): void {
  }
  obtenerPlan(id:any){
    this.gService
    .get('plan',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
    console.log(data);
    this.datos=data; 
    });
    }
    ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    }
    

}
