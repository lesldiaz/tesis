import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefinamientoComponent } from './refinamiento.component';

describe('RefinamientoComponent', () => {
  let component: RefinamientoComponent;
  let fixture: ComponentFixture<RefinamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefinamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefinamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
