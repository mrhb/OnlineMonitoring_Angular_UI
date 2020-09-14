import { Component, OnInit } from '@angular/core';
import { trendViewComponent } from '../trendView.Cmponent';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.sass']
})
export class ChartViewComponent implements trendViewComponent, OnInit {

  constructor() { }
  data: any;

  ngOnInit(): void {
  }

}
