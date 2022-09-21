import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPrevisualReqPlantillaComponent } from './tabla-previsual-req-plantilla.component';

describe('TablaPrevisualReqPlantillaComponent', () => {
  let component: TablaPrevisualReqPlantillaComponent;
  let fixture: ComponentFixture<TablaPrevisualReqPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPrevisualReqPlantillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPrevisualReqPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
