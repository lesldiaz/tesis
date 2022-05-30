import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaClienteComponent } from './plantilla-cliente.component';

describe('PlantillaClienteComponent', () => {
  let component: PlantillaClienteComponent;
  let fixture: ComponentFixture<PlantillaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
