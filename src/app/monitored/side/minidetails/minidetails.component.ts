import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'minidetails',
  templateUrl: './minidetails.component.html',
  styleUrls: ['./minidetails.component.css']
})
export class MinidetailsComponent implements OnInit {
  element: PeriodicElement | null=ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
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