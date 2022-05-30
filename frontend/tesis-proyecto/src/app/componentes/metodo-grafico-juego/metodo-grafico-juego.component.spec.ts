import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoGraficoJuegoComponent } from './metodo-grafico-juego.component';

describe('MetodoGraficoJuegoComponent', () => {
  let component: MetodoGraficoJuegoComponent;
  let fixture: ComponentFixture<MetodoGraficoJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodoGraficoJuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoGraficoJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
