import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import  * as moment from 'jalali-moment';
import  {Moment} from 'jalali-moment';
import { DatePickerComponent } from 'ng2-jalali-date-picker';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-maintenance-add-dlg',
  templateUrl: './maintenance-add-dlg.component.html',
  styleUrls: ['./maintenance-add-dlg.component.scss']
})
export class MaintenanceAddDlgComponent implements OnInit {
  StartTime:Moment =  moment().subtract(6,'h');
  datePickerConfig = {
    drops: 'up',
    format: 'YY/M/D',
    showGoToCurrent: true
}
@ViewChild('Start') datePickerStart: DatePickerComponent;
  constructor(
    public dialogRef: MatDialogRef<MaintenanceAddDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

}
