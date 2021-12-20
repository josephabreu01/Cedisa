import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionSucursalesMantenimientoComponent } from './informacion-sucursales-mantenimiento.component';

describe('InformacionSucursalesMantenimientoComponent', () => {
  let component: InformacionSucursalesMantenimientoComponent;
  let fixture: ComponentFixture<InformacionSucursalesMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionSucursalesMantenimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionSucursalesMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
