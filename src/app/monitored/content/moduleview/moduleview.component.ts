import { Component, OnInit, Input } from '@angular/core';
import { ViewComponent } from '../view.component';

@Component({
  selector: 'app-moduleview',
  templateUrl: './moduleview.component.html',
  styleUrls: ['./moduleview.component.sass']
})
export class ModuleviewComponent implements ViewComponent,OnInit {
  @Input() data: any;
  constructor() { }

  dataSource = ELEMENT_DATA;
 

  columnsToDisplay = ['Alarm','Name','Engine','Update','Actions'];
  expandedElement: PeriodicElement | null;

 
  ngOnInit(): void {
  }

}

export interface PeriodicElement {
  alarms:{name:string , Icon:string}[];
  itemName: string;
  update:string;
  engines: number;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {
    itemName: 'unit 1',
    engines:2,
    update:'2',
    alarms:[
      {name:'*WrnServiceTime',Icon:'sutdown'},{name:'*Emergency stop', Icon:'Sensor'}
    ]
  },
  {
    itemName: 'unit 2',
    engines:2,
    update:'2',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    itemName: 'unit 3',
    engines:2,
    update:'2',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Dongle Incomp', Icon:'warning'},
          {name:'*WrnServiceTime',Icon:'ECU'},
        ]
  },
  {
    itemName: 'unit 4',
    engines:2,
    update:'2',
    alarms:[
          {name:'*WrnServiceTime',Icon:'sutdown'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    itemName: 'unit 5',
    engines:2,
    update:'2',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'sutdown'}
        ]
  },
  {
    itemName: 'unit 6',
    engines:2,
    update:'3',
    alarms:[
          {name:'*WrnServiceTime',Icon:'warning'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    itemName: 'unit 7',
    engines:2,
    update:'1',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
     {
    itemName: 'unit 8',
    engines:2,
    update:'2',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
];
