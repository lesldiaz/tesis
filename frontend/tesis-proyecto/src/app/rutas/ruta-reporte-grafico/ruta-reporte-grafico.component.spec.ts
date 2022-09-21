import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaReporteGraficoComponent } from './ruta-reporte-grafico.component';

describe('RutaReporteGraficoComponent', () => {
  let component: RutaReporteGraficoComponent;
  let fixture: ComponentFixture<RutaReporteGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaReporteGraficoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaReporteGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
