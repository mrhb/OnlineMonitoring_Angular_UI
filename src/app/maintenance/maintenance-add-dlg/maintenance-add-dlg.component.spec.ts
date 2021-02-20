import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceAddDlgComponent } from './Maintenance-add-dlg.component';

describe('MaintenanceAddDlgComponent', () => {
  let component: MaintenanceAddDlgComponent;
  let fixture: ComponentFixture<MaintenanceAddDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceAddDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceAddDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
