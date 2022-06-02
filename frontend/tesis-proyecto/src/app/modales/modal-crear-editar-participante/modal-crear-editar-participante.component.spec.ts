import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearEditarParticipanteComponent } from './modal-crear-editar-participante.component';

describe('ModalCrearEditarParticipanteComponent', () => {
  let component: ModalCrearEditarParticipanteComponent;
  let fixture: ComponentFixture<ModalCrearEditarParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCrearEditarParticipanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearEditarParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
