import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaManualUsuarioComponent } from './ruta-manual-usuario.component';

describe('RutaManualUsuarioComponent', () => {
  let component: RutaManualUsuarioComponent;
  let fixture: ComponentFixture<RutaManualUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaManualUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaManualUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
