import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarProyectoComponent } from './crear-editar-proyecto.component';

describe('CrearEditarProyectoComponent', () => {
  let component: CrearEditarProyectoComponent;
  let fixture: ComponentFixture<CrearEditarProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEditarProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
