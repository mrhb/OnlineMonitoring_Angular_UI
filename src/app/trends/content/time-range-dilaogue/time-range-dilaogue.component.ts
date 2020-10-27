import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import  * as moment from 'jalali-moment';
import  {Moment} from 'jalali-moment';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
export interface DialogData {
  type: string;
  name: string;
}

@Component({
  selector: 'app-time-range-dilaogue',
  templateUrl: './time-range-dilaogue.component.html',
  styleUrls: ['./time-range-dilaogue.component.css']
})
export class TimeRangeDilaogueComponent implements OnInit {
  StartTime:Moment = moment('1395-11-23','jYYYY,jMM,jDD');
  EndTime:Moment = moment('1395-11-23','jYYYY,jMM,jDD');

  datePickerConfig = {
    drops: 'up',
    format: 'YY/M/D',
    showGoToCurrent: true
}
@ViewChild('Start') datePickerStart: DatePickerComponent;
@ViewChild('End') datePickerEnd: DatePickerComponent;
  
  constructor( public dialogRef: MatDialogRef<TimeRangeDilaogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }
    
    ngOnInit(): void {}
      onNoClick(): void {
        this.datePickerStart.api.moveCalendarTo(
          moment('1366-11-22','jYYYY,jMM,jDD')
        );
        this.datePickerEnd.api.moveCalendarTo(
          moment('1368-12-16','jYYYY,jMM,jDD')
        );
        console.log(this.StartTime);
        // this.dateObject = moment('1395-11-22','jYYYY,jMM,jDD');  
  }
  onYesClick(): void {
    console.log("EndTime: "+this.EndTime)
    console.log("StartTime: "+this.StartTime)
    this.dialogRef.close({'StartTime':this.StartTime,'EndTime':this.EndTime});
  }

}
