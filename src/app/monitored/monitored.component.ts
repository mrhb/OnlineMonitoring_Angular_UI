import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitored',
  templateUrl: './monitored.component.html',
  styleUrls: ['./monitored.component.css']
})
export class MonitoredComponent implements OnInit {
expantion:string="normal";
viewType:string="table";
selectedId:string="";

SideType:string="";
sideOpen:boolean=true;
showfilter:boolean=true;
showUnitDetail:boolean=false;
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
    if(this.expantion=="max")
    this.expantion="normal";
    else
    this.expantion="min";
  }

  filterClick(){
    this.showfilter=!this.showfilter;
    if( this.showfilter)
    {
      this.SideType="";
    }
    else
    {
      this.SideType="miniDetail";
    }
    this.sideOpen=(this.showfilter||this.showUnitDetail);
  }
  unitSelected(selectedId:string){
    this.selectedId=selectedId;
    this.showUnitDetail=true;
    if( this.showUnitDetail)
    {
      this.SideType="miniDetail";
    }
    else
    {
      this.SideType="";
    }
    this.sideOpen=(this.showfilter||this.showUnitDetail);
    console.log("selectedId:" +selectedId )
  }
  closeSide(){
    this.sideOpen=false;
  }
  setContentView(type:string){
    this.viewType=type;
  }
}
