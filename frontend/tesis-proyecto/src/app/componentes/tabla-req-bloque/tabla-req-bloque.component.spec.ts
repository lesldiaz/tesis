import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReqBloqueComponent } from './tabla-req-bloque.component';

describe('TablaReqBloqueComponent', () => {
  let component: TablaReqBloqueComponent;
  let fixture: ComponentFixture<TablaReqBloqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaReqBloqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReqBloqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
