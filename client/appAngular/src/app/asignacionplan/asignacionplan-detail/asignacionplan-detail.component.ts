import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-asignacionplan-detail',
  templateUrl: './asignacionplan-detail.component.html',
  styleUrls: ['./asignacionplan-detail.component.css']
})
export class AsignacionplanDetailComponent implements OnInit{

  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService, private route: ActivatedRoute) {
    let id = route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerAsignaciones(Number(id));
    }
  }

  ngOnInit(): void {}
  obtenerAsignaciones(id: any) {
    this.gService
      .get('/asignacionplan/pago/', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}
