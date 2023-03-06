import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidenciaIndexComponent } from './residencia-index.component';

describe('ResidenciaIndexComponent', () => {
  let component: ResidenciaIndexComponent;
  let fixture: ComponentFixture<ResidenciaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidenciaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidenciaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
