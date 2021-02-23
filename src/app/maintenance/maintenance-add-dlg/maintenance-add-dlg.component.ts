import Notiflix from "notiflix-angular";
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import  * as moment from 'jalali-moment';
import  {Moment} from 'jalali-moment';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { Maintenance,OneUnitMaintenanceInfo } from '@app/maintenance/service/maintenance';
import {MaintenanceService  } from "@app/maintenance/service/maintenance.service";
import { Unit } from '@app/management/services/unit';
import { stateInto } from '@app/monitored/service/UnitsData';

export interface DialogData {
  maintenances: Maintenance[] ;
  runHours:Number;
  stateInfo:stateInto
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



@Component({
  selector: 'app-maintenance-add-dlg',
  templateUrl: './maintenance-add-dlg.component.html',
  styleUrls: ['./maintenance-add-dlg.component.scss']
})
export class MaintenanceAddDlgComponent implements OnInit {


  displayedColumns = ['position', 'name', 'runHour', 'date'];
  dataSource 


  
  selectedMaintenance = new FormControl();
  RunHours = new FormControl();
  
  ServiceTime:Moment =  moment();
  config = {
    drops: 'down',
    format: 'YY/M/D',
    showGoToCurrent: true
}
@ViewChild('Start') datePickerStart: DatePickerComponent;
  constructor(
    public maintenaceSevice:MaintenanceService,
    public dialogRef: MatDialogRef<MaintenanceAddDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 
    this.RunHours = new FormControl(data.stateInfo.Run_Hours);
    this.dataSource =data.maintenances ;

  }

  
  ngOnInit(): void {
  }

  update():void{
    let item :  Maintenance = this.selectedMaintenance.value;
    item.runHour=this.RunHours.value;

    console.log(
      // this.ServiceTime.
    )
    item.date=this.ServiceTime.toDate();
  }


  save():void{
    this.maintenaceSevice.updateMaintenanceById(this.data.stateInfo.id,this.data.stateInfo.maintenances).subscribe({
      next: result => {
        Notiflix.Notify.Success(`${this.data.stateInfo.name}  maintenances updated`);
        this.dialogRef.close()
      },
      error: error =>{
        Notiflix.Notify.Failure('error on updating');

      }
    });
  }

}
