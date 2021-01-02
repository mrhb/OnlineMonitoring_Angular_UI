import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import{ViewComponent} from '../view.component'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { stateInto,unitsStateInfo } from '@app/monitored/service/UnitsData';

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
  @Input() data: unitsStateInfo=new unitsStateInfo([]);
  dataSource = new MatTableDataSource<stateInto>();
  
  constructor() { 
  }

  // dataSource = ELEMENT_DATA; 
  
  // columnsToDisplay = ['Alarm','Name','Engine','Update','Actions'];
  columnsToDisplay = ['Name','State','Update'];
  expandedElement: stateInto[] = [];
  
  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<stateInto>(this.data.items);
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