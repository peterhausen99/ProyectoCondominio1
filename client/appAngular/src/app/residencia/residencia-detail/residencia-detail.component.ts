import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-residencia-detail',
  templateUrl: './residencia-detail.component.html',
  styleUrls: ['./residencia-detail.component.css'],
})
export class ResidenciaDetailComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService, private route: ActivatedRoute) {
    let id = route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.obtenerResidencia(Number(id));
    }
  }

  ngOnInit(): void {}
  obtenerResidencia(id: any) {
    this.gService
      .get('residencia', id)
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
