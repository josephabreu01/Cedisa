import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCitaComponent } from './pre-cita.component';

describe('PreCitaComponent', () => {
  let component: PreCitaComponent;
  let fixture: ComponentFixture<PreCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreCitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
