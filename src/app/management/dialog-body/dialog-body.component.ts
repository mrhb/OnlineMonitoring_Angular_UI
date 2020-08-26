import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}



