import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReqGamePlayComponent } from './tabla-req-game-play.component';

describe('TablaReqGamePlayComponent', () => {
  let component: TablaReqGamePlayComponent;
  let fixture: ComponentFixture<TablaReqGamePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaReqGamePlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReqGamePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
