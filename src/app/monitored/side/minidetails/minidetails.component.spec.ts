import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinidetailsComponent } from './minidetails.component';

describe('MinidetailsComponent', () => {
  let component: MinidetailsComponent;
  let fixture: ComponentFixture<MinidetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinidetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinidetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
