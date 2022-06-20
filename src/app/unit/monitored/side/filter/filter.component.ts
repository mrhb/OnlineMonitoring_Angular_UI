import { Component, OnInit } from '@angular/core';

export interface alarm {
name:string ,
 Icon:string,
 checked:boolean
}

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
selected:string="all";
alarms:alarm[]=[
  {checked:false ,name:'sutdown', Icon:'Sutdown' },
  {checked:false ,name:'alarm'  , Icon:'Alarm'   },
  {checked:true ,name:'Warning', Icon:'Warning' },
  {checked:false ,name:'ECU'    , Icon:'ECU'     },
  {checked:false ,name:'Fail'   , Icon:'Fail'    },
  {checked:true ,name:'NoComm' , Icon:'NoComm'  },
  {checked:false ,name:'Diabled', Icon:'Disabled'},
  {checked:false ,name:'Online' , Icon:'Online'  },
];
  constructor() { }

  ngOnInit(): void {
  }


  unitsClicked(){
    this.selected="units";
  }
  groupsClicked(){
    this.selected="groups";
  }
  allClicked(){
    this.selected="all";
  }
  resetClicked(){
    this.alarms.forEach(element => {
      element.checked=false;      
    });
    this.selected="all";
  }
}
