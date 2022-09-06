import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosChartComponent } from './graficos-chart.component';

describe('GraficosChartComponent', () => {
  let component: GraficosChartComponent;
  let fixture: ComponentFixture<GraficosChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficosChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
