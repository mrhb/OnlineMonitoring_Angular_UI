import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableviewComponent } from './tableview.component';

describe('TableviewComponent', () => {
  let component: TableviewComponent;
  let fixture: ComponentFixture<TableviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
