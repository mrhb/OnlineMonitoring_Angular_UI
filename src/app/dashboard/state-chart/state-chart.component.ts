import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-state-chart',
  templateUrl: './state-chart.component.html',
  styleUrls: ['./state-chart.component.sass']
})
export class StateChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true, 
  };
  public barChartLabels: Label[] = ['Ready', 'Running ', 'Loaded', 'Stop', 'Init', 'Shout down', 'NotReady','EmergMan'];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartPlugins = [];  

  public barChartData: ChartDataSets[] = [
    { data: [2,1,1,2,0,0,15,], label: 'Series B' ,backgroundColor :'Teal' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
