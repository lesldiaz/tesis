import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PestanaPlantillaComponent } from './pestana-plantilla.component';

describe('PestanaPlantillaComponent', () => {
  let component: PestanaPlantillaComponent;
  let fixture: ComponentFixture<PestanaPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PestanaPlantillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PestanaPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
