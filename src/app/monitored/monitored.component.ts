import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitored',
  templateUrl: './monitored.component.html',
  styleUrls: ['./monitored.component.css']
})
export class MonitoredComponent implements OnInit {
expantion:string="normal";
viewType:string="table";
  constructor() { }

  ngOnInit(): void {
  }
  expand(){
    if(this.expantion=="min")
    this.expantion="normal";
    else
    this.expantion="max";
  }
  collapse(){
    console.log("sadfcgr");
    if(this.expantion=="max")
    this.expantion="normal";
    else
    this.expantion="min";
  }
  setView(){

  }
  setContentView(type:string){
    this.viewType=type;
  }
}
