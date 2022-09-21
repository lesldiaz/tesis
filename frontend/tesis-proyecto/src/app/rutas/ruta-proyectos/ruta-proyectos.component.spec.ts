import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaProyectosComponent } from './ruta-proyectos.component';

describe('RutaProyectosComponent', () => {
  let component: RutaProyectosComponent;
  let fixture: ComponentFixture<RutaProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaProyectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
