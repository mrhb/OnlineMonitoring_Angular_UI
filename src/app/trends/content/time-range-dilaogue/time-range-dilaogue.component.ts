import { Component, Inject, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
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
  dateObject = moment('1366-11-22','jYYYY,jMM,jDD');

    constructor( public dialogRef: MatDialogRef<TimeRangeDilaogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
