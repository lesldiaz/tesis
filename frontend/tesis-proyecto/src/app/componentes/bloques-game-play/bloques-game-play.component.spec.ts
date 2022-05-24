import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquesGamePlayComponent } from './bloques-game-play.component';

describe('BloquesGamePlayComponent', () => {
  let component: BloquesGamePlayComponent;
  let fixture: ComponentFixture<BloquesGamePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloquesGamePlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloquesGamePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
