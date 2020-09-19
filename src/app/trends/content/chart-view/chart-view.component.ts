import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import { SeriesInfo } from '../../trendInfo';
import { trendViewComponent } from '../trendView.Cmponent';
import { MatDialog } from '@angular/material/dialog';
import { TimeRangeDilaogueComponent } from '../time-range-dilaogue/time-range-dilaogue.component';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css']
})
export class ChartViewComponent implements trendViewComponent, OnInit {

  
  data: SeriesInfo[];
  SelectedRange:string="Today";
  Type:string="Line";

  Ranges = [
     { value: 1, label: 'Today'},
     { value: 2, label: 'Last 3 Days'},
     { value: 2, label: 'Last Week'},
     { value: 2, label: 'Last Month'},
     { value: 2, label: 'Last 2 Month'},
     { value: 2, label: 'Last 3 Month'},
     { value: 2, label: 'Last 6 Month'},
     { value: 2, label: 'Last 9 Month'},
     { value: 2, label: 'Last 1 Year'},
     { value: 3, label: 'From - To' }
    ];
  Types=[
    { value: 1, label: 'Line'},
    { value: 2, label: 'Bar'},
    { value: 2, label: 'Heat map'},
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
  form: FormGroup;

  formGroup :FormGroup ; 

  constructor(private fb: FormBuilder,
    public dialog: MatDialog) { }
  
  
  public barChartLabels: Label[] = ['Ready', 'Running ', 'Loaded', 'Stop', 'Init', 'Shout down', 'NotReady','EmergMan'];
  public barChartType: ChartType = 'line';
  public barChartLegend = false;
  public barChartPlugins = [];  
  
  public barChartData: ChartDataSets[] = [
    { data: [2,11,1,2,8,0,15], label: 'Series B' ,backgroundColor : 'rgba(255,0,0,0.3)' }
  ];
  
  public barChartOptions: ChartOptions = {
    responsive: true, 
    title: {
    display: true,
    text: 'Unit 1'
    },
    tooltips: {
        mode: 'index',
        intersect: false,
    },
    // scales: {
    //       xAxes: [{
    //             type: 'time',
    //             time: {
    //                   parser: 'MM/DD/YYYY HH:mm:ss',
    //                   round: 'day',
    //                   tooltipFormat: 'll HH:mm'
    //               },
    //               scaleLabel: {
    //                     display: true,
    //                     labelString: ''
    //                 },
    //                 ticks: {
    //                       maxRotation: 0
    //                   }
    //               }],
    //       yAxes: [{
    //             scaleLabel: {
    //                   display: true,
    //                   labelString: 'Power(Kw)'
    //               }
    //           }]
    // },
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
        
  selectedFood2: string;

  onFoodSelection2() {
    console.log(this.selectedFood2);
 

    const dialogRef = this.dialog.open(TimeRangeDilaogueComponent, {
      width: '400px',
      data: {name: "sedf", type: "user"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     

    });   
  }
                    
                    
ngOnInit(): void {
  this.form = this.fb.group({
      first: [],
      second: []
    })
  }

}
