import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionesMantenimientoComponent } from './extensiones-mantenimiento.component';

describe('ExtensionesMantenimientoComponent', () => {
  let component: ExtensionesMantenimientoComponent;
  let fixture: ComponentFixture<ExtensionesMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionesMantenimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionesMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
