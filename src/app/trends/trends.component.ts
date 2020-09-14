import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
  viewType:string;

  constructor() { }

  ngOnInit(): void {
  }
  onActivate(){
    console.log('onActivate');
  }
  onDeactivate(){
    console.log('onDeactivate');
  }
  setContentView(type:string){
    this.viewType=type;
  }


}
