import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaRegistroUsuarioComponent } from './ruta-registro-usuario.component';

describe('RutaRegistroUsuarioComponent', () => {
  let component: RutaRegistroUsuarioComponent;
  let fixture: ComponentFixture<RutaRegistroUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaRegistroUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaRegistroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
