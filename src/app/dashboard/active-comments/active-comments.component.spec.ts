import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCommentsComponent } from './active-comments.component';

describe('ActiveCommentsComponent', () => {
  let component: ActiveCommentsComponent;
  let fixture: ComponentFixture<ActiveCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
