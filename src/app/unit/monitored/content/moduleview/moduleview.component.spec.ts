import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleviewComponent } from './moduleview.component';

describe('ModuleviewComponent', () => {
  let component: ModuleviewComponent;
  let fixture: ComponentFixture<ModuleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
