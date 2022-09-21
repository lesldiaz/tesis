import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualUsuarioComponent } from './manual-usuario.component';

describe('ManualUsuarioComponent', () => {
  let component: ManualUsuarioComponent;
  let fixture: ComponentFixture<ManualUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
