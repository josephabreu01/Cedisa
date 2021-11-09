import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientopreguntasComponent } from './mantenimientopreguntas.component';

describe('MantenimientopreguntasComponent', () => {
  let component: MantenimientopreguntasComponent;
  let fixture: ComponentFixture<MantenimientopreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientopreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientopreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
