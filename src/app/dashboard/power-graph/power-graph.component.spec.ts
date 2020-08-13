import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerGraphComponent } from './power-graph.component';

describe('PowerGraphComponent', () => {
  let component: PowerGraphComponent;
  let fixture: ComponentFixture<PowerGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
