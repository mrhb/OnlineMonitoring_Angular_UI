import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import{ViewComponent} from '../view.component'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { stateInto,unitsStateInfo } from '@app/monitored/service/UnitsData';
import { OnDestroy } from '@angular/core';
import { StatesService } from '@app/monitored/service/states.service';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MaintenanceAddDlgComponent } from '@app/maintenance/maintenance-add-dlg/maintenance-add-dlg.component';
import { Unit } from '@app/management/services/unit';


@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      // transition('expanded <=> collapsed', animate('50ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableviewComponent implements ViewComponent,OnInit,OnDestroy {
  dataSource = new MatTableDataSource<stateInto>();
  stateInfos:stateInto[];
  constructor(
    public dialog: MatDialog,
    private statesService:StatesService
  ) { 
  }
  ngOnDestroy(): void {
   console.log("tableview destroyed");
  }

  // dataSource = ELEMENT_DATA; 
  
  // columnsToDisplay = ['Alarm','Name','Engine','Update','Actions'];
  columnsToDisplay = ['Name','State','Update','action'];
  expandedElement: stateInto|null ;
  
  
  ngOnInit(): void {
    
    this.statesService.UnitsDataSubject.subscribe((data)=>{
      this.stateInfos=data.items;
      this.dataSource = new MatTableDataSource<stateInto>(data.items);
         });
  }

  openDialog(info:stateInto) {
    const dialogRef = this.dialog.open(MaintenanceAddDlgComponent,
            { 
              // width: '300px', 
              data : 
              {
                maintenances:this.stateInfos[0].maintenances,
                runHours:this.stateInfos[0].Run_Hours,
                stateInfo:info
              }
            }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.statesService.LoadStateReq();
      // console.log(`Dialog result: ${result}`);
    });
  }
}