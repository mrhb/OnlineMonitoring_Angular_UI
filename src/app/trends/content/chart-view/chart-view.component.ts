import {mockk2} from './mockData';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import 'chartjs-plugin-zoom'


import { Label } from 'ng2-charts';

import { SeriesData, SeriesInfo } from '../../trendInfo';
import { trendViewComponent } from '../trendView.Cmponent';
import { MatDialog } from '@angular/material/dialog';
import { TimeRangeDilaogueComponent } from '../time-range-dilaogue/time-range-dilaogue.component';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css']
})
export class ChartViewComponent implements trendViewComponent, OnInit {

  
  seriesInfo: SeriesInfo[];
  seriesData: SeriesData;
  
  Ranges = [
     { value: 1, label: 'Today'},
     { value: 2, label: 'Last 3 Days'},
     { value: 3, label: 'Last Week'},
     { value: 4, label: 'Last Month'},
     { value: 5, label: 'Last 2 Month'},
     { value: 6, label: 'Last 3 Month'},
     { value: 7, label: 'Last 6 Month'},
     { value: 8, label: 'Last 9 Month'},
     { value: 9, label: 'Last 1 Year'},
     { value: 10, label: 'From - To' }
    ];
    Types=[
      { value:  "line", label: 'Line'},
      { value:  "bar", label: 'Bar'},
      { value:  "heatmap", label: 'Heat map'},
    ]; 
    Tools=[
      { value: 1, label: 'Connect all points'},
      { value: 2, label: 'Trim visible data'},
      { value: 2, label: 'Ocilloscope mode'},
      { value: 2, label: 'Reload all data'},
    ];
    toppingList: string[] = [
      'Show points',
      'Multiple axis', 
      'No legend', 
      'Short legend', 
      'Full legend',
      'Hide tooltips',
      'Show full screen'
    ];
    toppings = new FormControl();
    SelectedRange=this.Ranges[1];
    SelectedType=this.Types[1];
  form: FormGroup;

  formGroup :FormGroup ; 

  
  
  public barChartLabels: Label[] = ['Ready', 'Running ', 'Loaded', 'Stop', 'Init', 'Shout down', 'NotReady','EmergMan'];
  public barChartType: ChartType = 'line';
  public barChartLegend = false;
  public barChartPlugins = [];  
  public barChartData: ChartDataSets[];
  public barChartOptions: ChartOptions = {
    responsive: true, 
    title: {
    display: false,
    text: 'Unit 1'
    },
    tooltips: {
        mode: 'index',
        intersect: false,
    },
    scales: {
          xAxes: [{
                type: 'time',
                time: {
                      parser: 'MM/DD/YYYY HH:mm:ss',
                      // round: 'minute',
                      tooltipFormat: 'll HH:mm:ss'
                  },
                  scaleLabel: {
                        display: true,
                        labelString: ''
                    },
                    ticks: {
                          maxRotation: 0
                      }
                  }],
          yAxes: [{
                scaleLabel: {
                      display: true,
                      labelString: 'Power(Kw)'
                  }
              }]
    },
    plugins: {
          zoom: {
                zoom: {
                      enabled: true,
                      drag: false,
                      mode: 'x',
                      speed: 0.1
                  }
              }
    }
  };
  constructor(private fb: FormBuilder,
    public dialog: MatDialog) { 
     
    }     
  selectedRange: string;
  selectedType: string='line';
  onTypeSelection(type ){
    console.log(type +"  Type Selected");
    this.barChartType = <ChartType>type;
  }
  onRangeSelection() {
    console.log(this.selectedRange);
 

    const dialogRef = this.dialog.open(TimeRangeDilaogueComponent, {
          data: {name: "sedf", type: "user"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });   
  }
                    
                    
ngOnInit(): void {
  this.barChartData = mockk2(this.seriesData);
  this.form = this.fb.group({
      first: [],
      second: []
    })
  }

}
