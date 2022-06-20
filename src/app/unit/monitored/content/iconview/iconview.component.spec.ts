import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconviewComponent } from './iconview.component';

describe('IconviewComponent', () => {
  let component: IconviewComponent;
  let fixture: ComponentFixture<IconviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
