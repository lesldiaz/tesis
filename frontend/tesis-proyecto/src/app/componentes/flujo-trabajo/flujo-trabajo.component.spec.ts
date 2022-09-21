import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoTrabajoComponent } from './flujo-trabajo.component';

describe('FlujoTrabajoComponent', () => {
  let component: FlujoTrabajoComponent;
  let fixture: ComponentFixture<FlujoTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlujoTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
