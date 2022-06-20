import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoredComponent } from './monitored.component';

describe('MonitoredComponent', () => {
  let component: MonitoredComponent;
  let fixture: ComponentFixture<MonitoredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
