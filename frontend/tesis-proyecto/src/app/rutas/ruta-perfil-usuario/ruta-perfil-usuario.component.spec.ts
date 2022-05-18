import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaPerfilUsuarioComponent } from './ruta-perfil-usuario.component';

describe('RutaPerfilUsuarioComponent', () => {
  let component: RutaPerfilUsuarioComponent;
  let fixture: ComponentFixture<RutaPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaPerfilUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
