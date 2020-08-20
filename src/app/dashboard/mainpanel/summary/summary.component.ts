import { Component, OnInit } from '@angular/core';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'dashboard-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'One', cols:1 , rows: 1, color: 'lightblue'},
    {text: 'One', cols:1 , rows: 1, color: 'lightblue'}
      
    ];
  constructor() { }

  ngOnInit(): void {
  }

}
