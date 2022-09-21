import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoGraficoClienteComponent } from './metodo-grafico-cliente.component';

describe('MetodoGraficoClienteComponent', () => {
  let component: MetodoGraficoClienteComponent;
  let fixture: ComponentFixture<MetodoGraficoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodoGraficoClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoGraficoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
