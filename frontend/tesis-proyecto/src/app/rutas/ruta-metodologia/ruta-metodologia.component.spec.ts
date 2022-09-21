import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaMetodologiaComponent } from './ruta-metodologia.component';

describe('RutaMetodologiaComponent', () => {
  let component: RutaMetodologiaComponent;
  let fixture: ComponentFixture<RutaMetodologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaMetodologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaMetodologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
