import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaParticipantesComponent } from './ruta-participantes.component';

describe('RutaParticipantesComponent', () => {
  let component: RutaParticipantesComponent;
  let fixture: ComponentFixture<RutaParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaParticipantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
