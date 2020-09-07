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
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableviewComponent implements ViewComponent,OnInit {
  @Input() data: any;
  constructor() { }

  dataSource = ELEMENT_DATA;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PeriodicElement>;
 

  columnsToDisplay = ['unitname','alarms'];
  expandedElement: PeriodicElement | null;

 
  ngOnInit(): void {
  }

}

export interface PeriodicElement {
  alarms:{name:string , Icon:string}[];
  unitname: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {
    unitname: 'unit 1',
    alarms:[
      {name:'*WrnServiceTime',Icon:'sutdown'},{name:'*Emergency stop', Icon:'Sensor'}
    ]
  },
  {
    unitname: 'unit 2',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    unitname: 'unit 3',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Dongle Incomp', Icon:'warning'},
          {name:'*WrnServiceTime',Icon:'ECU'},
        ]
  },
  {
    unitname: 'unit 4',
    alarms:[
          {name:'*WrnServiceTime',Icon:'sutdown'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    unitname: 'unit 5',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'sutdown'}
        ]
  },
  {
    unitname: 'unit 6',
    alarms:[
          {name:'*WrnServiceTime',Icon:'warning'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
  {
    unitname: 'unit 7',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
     {
    unitname: 'unit 8',
    alarms:[
          {name:'*WrnServiceTime',Icon:'alarm'},{name:'*Emergency stop', Icon:'warning'}
        ]
  },
];
