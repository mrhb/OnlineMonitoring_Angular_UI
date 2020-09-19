import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRangeDilaogueComponent } from './time-range-dilaogue.component';

describe('TimeRangeDilaogueComponent', () => {
  let component: TimeRangeDilaogueComponent;
  let fixture: ComponentFixture<TimeRangeDilaogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeRangeDilaogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRangeDilaogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
