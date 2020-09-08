import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import{ViewComponent} from '../view.component'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableviewComponent implements ViewComponent,OnInit {
  @Input() data: any;
  constructor() { }

  dataSource = ELEMENT_DATA; 

  columnsToDisplay = ['Alarm','Name','Engine','Update','Actions'];
  expandedElement: RowElement[] = [];

 
  ngOnInit(): void {
  }
  checkExpanded(element): boolean {
    let flag = false;
    this.expandedElement.forEach(e => {
      if(e === element) {
        flag = true;        
      }
    });
    return flag;
  }

  pushPopElement(element) {
    const index = this.expandedElement.indexOf(element);
    console.log(index);
    if(index === -1) {
        this.expandedElement.push(element);
    } else {
      this.expandedElement.splice(index,1);
    }
  }

}

export interface RowElement {
  alarms:{name:string , Icon:string}[];
  itemName: string;
  engines: number;
  update: number;
  subunit:RowElement[];
}


const ELEMENT_DATA: RowElement[] = [
  {
    itemName: 'unit 1',
    engines:2,
    update:2,
    subunit:[
      {
        itemName: 'unit 1',
        engines:2,
        update:2,
        subunit:[],
        alarms:[
          {name:'*WrnServiceTime',Icon:'sutdown'},{name:'*Emergency stop', Icon:'Sensor'}
        ]
      },
      {
        itemName: 'unit 2',
        engines:2,
        update:1,
        subunit:[],
        alarms:[
              {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
            ]
      },
    ],
    alarms:[
      {name:'*WrnServiceTime',Icon:'sutdown'},{name:'*Emergency stop', Icon:'Sensor'}
    ]
  },
  {
    itemName: 'unit 2',
    engines:2,
    update:1,
    subunit:[],
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    itemName: 'unit 3',
    engines:2,
    update:3,
    subunit:[],
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Dongle Incomp', Icon:'warning'},
          {name:'*WrnServiceTime',Icon:'ECU'},
        ]
  },
  {
    itemName: 'unit 4',
    engines:2,
    update:1,
    subunit:[],
    alarms:[
          {name:'*WrnServiceTime',Icon:'sutdown'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    itemName: 'unit 5',
    engines:2,
    update:1,
    subunit:[],
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'sutdown'}
        ]
  },
  {
    itemName: 'unit 6',
    engines:2,
    update:1,
    subunit:[],
    alarms:[
          {name:'*WrnServiceTime',Icon:'warning'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    itemName: 'unit 7',
    engines:1,
    update:1,
    subunit:[],
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
     {
    itemName: 'unit 8',
    engines:2,
    update:1,
    subunit:[],
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
];
