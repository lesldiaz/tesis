import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaParticipanteProyectoComponent } from './ruta-participante-proyecto.component';

describe('RutaParticipanteProyectoComponent', () => {
  let component: RutaParticipanteProyectoComponent;
  let fixture: ComponentFixture<RutaParticipanteProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaParticipanteProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaParticipanteProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
