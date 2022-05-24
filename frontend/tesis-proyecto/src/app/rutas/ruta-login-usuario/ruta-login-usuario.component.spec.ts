import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaLoginUsuarioComponent } from './ruta-login-usuario.component';

describe('RutaLoginUsuarioComponent', () => {
  let component: RutaLoginUsuarioComponent;
  let fixture: ComponentFixture<RutaLoginUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaLoginUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaLoginUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
