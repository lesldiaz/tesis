import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDuplicarProyectoComponent } from './modal-duplicar-proyecto.component';

describe('ModalDuplicarProyectoComponent', () => {
  let component: ModalDuplicarProyectoComponent;
  let fixture: ComponentFixture<ModalDuplicarProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDuplicarProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDuplicarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
