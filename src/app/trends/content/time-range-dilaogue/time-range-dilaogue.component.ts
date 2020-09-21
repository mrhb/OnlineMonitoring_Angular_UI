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
  dateObject:Moment = moment('1395-11-23','jYYYY,jMM,jDD');

  datePickerConfig = {
    drops: 'up',
    format: 'YY/M/D',
    showGoToCurrent: true
}
@ViewChild('dayPicker') datePicker: DatePickerComponent;
  
  constructor( public dialogRef: MatDialogRef<TimeRangeDilaogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
     

      
    }
    
    ngOnInit(): void {}
      onNoClick(): void {
        this.datePicker.api.moveCalendarTo(
          moment('1395-11-22','jYYYY,jMM,jDD')
        );
        console.log(this.dateObject);
        // this.dateObject = moment('1395-11-22','jYYYY,jMM,jDD');  
  }
  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
