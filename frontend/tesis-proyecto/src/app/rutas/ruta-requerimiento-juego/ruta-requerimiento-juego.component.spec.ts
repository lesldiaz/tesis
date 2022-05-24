import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaRequerimientoJuegoComponent } from './ruta-requerimiento-juego.component';

describe('RutaRequerimientoJuegoComponent', () => {
  let component: RutaRequerimientoJuegoComponent;
  let fixture: ComponentFixture<RutaRequerimientoJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaRequerimientoJuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaRequerimientoJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
