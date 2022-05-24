import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaRequerimientoClienteComponent } from './ruta-requerimiento-cliente.component';

describe('RutaRequerimientoClienteComponent', () => {
  let component: RutaRequerimientoClienteComponent;
  let fixture: ComponentFixture<RutaRequerimientoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaRequerimientoClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaRequerimientoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
