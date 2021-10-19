import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoAvisosComponent } from './mantenimiento-avisos.component';

describe('MantenimientoAvisosComponent', () => {
  let component: MantenimientoAvisosComponent;
  let fixture: ComponentFixture<MantenimientoAvisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoAvisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoAvisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
