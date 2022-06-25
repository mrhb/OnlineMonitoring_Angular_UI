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
import { stateInto } from '@app/unit/service/UnitsData';

export interface DialogData {
  maintenances: Maintenance[] ;
  stateInfo:stateInto
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-maintenance-add-dlg',
  templateUrl: './maintenance-add-dlg.component.html',
  styleUrls: ['./maintenance-add-dlg.component.scss']
})
export class MaintenanceAddDlgComponent implements OnInit {


  displayedColumns = ['position', 'name','interval', 'runHour', 'date'];
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
  getInterval(element:Maintenance):string{
    if(element.criteria as any =="day")
      return "  "+ element.duration+"d  ";
    else if(element.criteria as any =="runHour")
      return "  "+element.duration+"h  ";
    else
      return "  on Winter  ";
  }
  update():void{
    let item :  Maintenance = this.selectedMaintenance.value;
    item.runHour=this.RunHours.value;
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
