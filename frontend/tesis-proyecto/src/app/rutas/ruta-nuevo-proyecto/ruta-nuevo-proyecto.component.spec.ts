import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaNuevoProyectoComponent } from './ruta-nuevo-proyecto.component';

describe('RutaNuevoProyectoComponent', () => {
  let component: RutaNuevoProyectoComponent;
  let fixture: ComponentFixture<RutaNuevoProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaNuevoProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaNuevoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
