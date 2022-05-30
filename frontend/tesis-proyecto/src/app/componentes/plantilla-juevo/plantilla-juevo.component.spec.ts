import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaJuevoComponent } from './plantilla-juevo.component';

describe('PlantillaJuevoComponent', () => {
  let component: PlantillaJuevoComponent;
  let fixture: ComponentFixture<PlantillaJuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaJuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaJuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
