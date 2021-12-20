import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiosVistaComponent } from './estudios-vista.component';

describe('EstudiosVistaComponent', () => {
  let component: EstudiosVistaComponent;
  let fixture: ComponentFixture<EstudiosVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiosVistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiosVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
