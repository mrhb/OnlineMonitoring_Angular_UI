import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-power-graph',
  templateUrl: './power-graph.component.html',
  styleUrls: ['./power-graph.component.sass']
})
export class PowerGraphComponent implements OnInit {
  constructor() { }
  unitPower=[
    {unitName: 'unit 1',power: 33},
    {unitName: 'unit 2',power: 66},
    {unitName: 'unit 3',power: 0},
    {unitName: 'unit 4',power: 33},
    {unitName: 'unit 5',power: 80},
    {unitName: 'unit 6',power: 50},
    {unitName: 'unit 7',power: 50},
    {unitName: 'unit 8',power: 0}, 
    {unitName: 'unit 9',power: 47},
    {unitName: 'unit 10',power: 90},
  ];

  
  ngOnInit(): void {
   
  }

}
