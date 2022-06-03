import { Component, Input, OnInit } from '@angular/core';
import { StatesService } from '@app/monitored/service/states.service';
import { stateInto } from '@app/monitored/service/UnitsData';

@Component({
  selector: 'minidetails',
  templateUrl: './minidetails.component.html',
  styleUrls: ['./minidetails.component.css']
})
export class MinidetailsComponent implements OnInit {
  @Input() unitId:string;
  element: PeriodicElement | null=ELEMENT_DATA;
  stateInfos:stateInto;

  constructor(private statesService:StatesService) { }

  ngOnInit(): void {
    this.statesService.UnitsDataSubject.subscribe((data)=>{
      this.stateInfos=data.getById(this.unitId);
         });
  }

}



export interface PeriodicElement {
  alarms:{name:string , Icon:string}[];
  unitname: string;
}


const ELEMENT_DATA: PeriodicElement=
  {
    unitname: 'unit 1',
    alarms:[
      {name:'*WrnServiceTime',Icon:'sutdown'},
      {name:'*Emergency stop', Icon:'Sensor'},
      {name:'*WrnServiceTime',Icon:'ECU'},
    ]
  };