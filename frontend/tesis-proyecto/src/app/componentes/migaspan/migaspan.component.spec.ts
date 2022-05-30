import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigasPanComponent } from './migaspan.component';

describe('MigasPanComponent', () => {
  let component: MigasPanComponent;
  let fixture: ComponentFixture<MigasPanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigasPanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MigasPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
