import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAplicacionComponent } from './ruta-aplicacion.component';

describe('RutaAplicacionComponent', () => {
  let component: RutaAplicacionComponent;
  let fixture: ComponentFixture<RutaAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAplicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
