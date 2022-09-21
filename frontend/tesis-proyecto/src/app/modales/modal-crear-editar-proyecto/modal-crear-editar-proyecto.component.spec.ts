import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearEditarProyectoComponent } from './modal-crear-editar-proyecto.component';

describe('ModalCrearEditarProyectoComponent', () => {
  let component: ModalCrearEditarProyectoComponent;
  let fixture: ComponentFixture<ModalCrearEditarProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCrearEditarProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearEditarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
