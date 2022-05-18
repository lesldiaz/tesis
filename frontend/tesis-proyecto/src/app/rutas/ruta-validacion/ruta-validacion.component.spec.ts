import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaValidacionComponent } from './ruta-validacion.component';

describe('RutaValidacionComponent', () => {
  let component: RutaValidacionComponent;
  let fixture: ComponentFixture<RutaValidacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaValidacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaValidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
