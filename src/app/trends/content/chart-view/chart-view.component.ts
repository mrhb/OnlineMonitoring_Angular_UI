import {DataPreparation} from './DataPreparation';
import {IRange} from '../../range'
import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType, TimeScale } from 'chart.js';
import 'chartjs-plugin-zoom'
import { Chart } from 'chart.js';

import { MetricInfo, SeriesData, SeriesInfo } from '../../trendInfo';
import { trendViewComponent } from '../trendView.Cmponent';
import { MatDialog } from '@angular/material/dialog';
import { TimeRangeDilaogueComponent } from '../time-range-dilaogue/time-range-dilaogue.component';
import * as moment from 'moment';
import { TrendsService } from '@app/trends/trends.service';
const OPTIONS: ChartOptions = {
  responsive: true, 
  maintainAspectRatio: false,
  title: {
  display: false,
  text: 'Unit 1'
  },
  elements:{
    point:{
      radius:0
    }
  },
  tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(tooltipItem, data) {
            return  Number(tooltipItem.yLabel).toFixed(2).replace(/./g, function(c, i, a) {
                return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
            });
        }
      }
  },
  scales: {
        xAxes: [{
              type: 'time',
              time: {
                    parser: 'MM/DD/YYYY HH:mm:ss',
                    round: 'minute',
                    tooltipFormat: 'll HH:mm'
                  },
                scaleLabel: {
                      display: true,
                      labelString: 'Time'
                  },
                  ticks: {
                        maxRotation: 45
                    }
                }],
                yAxes: [{
                  scaleLabel: {
                        display: true,
                        //labelString: 'Power(Kw)'
                        
                    },
                    ticks: {
                        // suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                        // OR //
                        beginAtZero: true   // minimum value will be 0.
                    }
                }
            ]
  },
  plugins: {
        zoom: {
          // Container for pan options
              pan: {
                // Boolean to enable panning
                enabled: true,

                // Panning directions. Remove the appropriate direction to disable
                // Eg. 'y' would only allow panning in the y direction
                // A function that is called as the user is panning and returns the
                // available directions can also be used:
                //   mode: function({ chart }) {
                //     return 'xy';
                //   },
                mode: 'x',

                rangeMin: {
                  // Format of min pan range depends on scale type
                  x: null,
                  y: null
                },
                rangeMax: {
                  // Format of max pan range depends on scale type
                  x: null,
                  y: null
                },

                // On category scale, factor of pan velocity
                speed: 20,

                // Minimal pan distance required before actually applying pan
                threshold: 10,

                // Function called while the user is panning
                onPan: function({chart}) { console.log(`I'm panning!!!`); },
                // Function called once panning is completed
                onPanComplete: function({chart}) { console.log(`I was panned!!!`); }
              },
              zoom: {
                    enabled: true,
                    // Enable drag-to-zoom behavior
                    drag: false,
                    mode: 'x',
                    speed: 0.1
                  }
            }
  }
};

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css']
})
export class ChartViewComponent implements trendViewComponent, OnInit ,AfterViewInit{

  @Output() RangesEvent = new EventEmitter<IRange>();
  
  Ranges = [
     { value: 1, label: 'Today'},
     { value: 2, label: 'Last 3 Days'},
     { value: 3, label: 'Last Week'},
    //  { value: 4, label: 'Last Month'},
    //  { value: 5, label: 'Last 2 Month'},
    //  { value: 6, label: 'Last 3 Month'},
    //  { value: 7, label: 'Last 6 Month'},
    //  { value: 8, label: 'Last 9 Month'},
    //  { value: 9, label: 'Last 1 Year'},
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
    'panning',
    'fit to data',
    'trim start&end null data',
    'zoom&pan xy',
    'show point',
    // 'Multiple axis', 
    // 'No legend', 
    // 'Short legend', 
    // 'Full legend',
    // 'Hide tooltips',
    // 'Show full screen'
  ];
  toppings = new FormControl();
  SelectedRange=this.Ranges[1];
  SelectedType=this.Types[1];
  form: FormGroup;
  formGroup :FormGroup ; 
  public trim:boolean=false; //remove null data
  public chart:Chart ; // This will hold our chart info
  public ChartType: ChartType = 'line';
  public ChartOptions: ChartOptions = OPTIONS;
  public context: CanvasRenderingContext2D;
  public ChartData: any[];
  public info:MetricInfo[];
  @ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;
  selectedRange: number=1;
  selectedType: string='line';

  constructor(
    public _trendsService:TrendsService,
    private fb: FormBuilder,
    public dialog: MatDialog
    ){ 
  }
  
  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');

    this.chart = new Chart( this.context , {
      type: this.ChartType,
      options:this.ChartOptions
    });

  }
                    
  ngOnInit(): void {    
    this._trendsService.metricsDataSubject.subscribe((data)=>{
      this.info =this._trendsService.getSelected();
      if((data!=null) && (this.info.length!=0) && (this.chart))
      {
        this.ChartData =data;
        this.Display();
      }
        
    });
  }
  EnablePanning()
  {
    if ( this.chart.options.plugins.zoom.zoom.enabled) {
      this.chart.options.plugins.zoom.pan.enabled = true;
      this.chart.options.plugins.zoom.zoom.enabled = false;
      this.chart.options.plugins.zoom.zoom.drag = false;
    }
    else{
      this.chart.options.plugins.zoom.pan.enabled = false;
      this.chart.options.plugins.zoom.zoom.enabled = true;
      this.chart.options.plugins.zoom.zoom.drag = true;
    }
    this.Display();
  }
  Display()
  {
    this.chart.data.datasets= DataPreparation(this.ChartData,this.info,this.trim);
    this.chart.update()
  }
  onDisplayChange(toppings)
  {
    console.log(toppings);
    switch (toppings) {
      case 'panning':
        this.EnablePanning();
        break
      case 'fit to data':
        this.chart.options.scales.yAxes[0].ticks.beginAtZero=!this.chart.options.scales.yAxes[0].ticks.beginAtZero;
        break
      case   'trim start&end null data':
        this.trim=!this.trim;
        break
      case 'zoom&pan xy':
        if(this.chart.options.plugins.zoom.zoom.mode=='x')
        {
          this.chart.options.plugins.zoom.zoom.mode='xy';
          this.chart.options.plugins.zoom.pan.mode='xy';
        }
        else
        {
        this.chart.options.plugins.zoom.zoom.mode='x';  
        this.chart.options.plugins.zoom.pan.mode='x';
        }
        break
        case 'show point':
          if(this.chart.options.elements.point.radius !=0)
          this.chart.options.elements.point.radius =0;
          else
          this.chart.options.elements.point.radius =3;
        break
      default:
      break
    }
    this.Display();
  }
  onTypeSelection(type ){
    console.log(type +"  Type Selected");

    this.ChartType=<ChartType>type;

    this.chart.destroy();
    this.chart = new Chart(this.context, {
      type: this.ChartType,
      options:this.ChartOptions,
    });

    this.chart.data.datasets= DataPreparation(this.ChartData,this.info,this.trim);
    this.chart.update();
  }

  onRangeSelection() {
    var range:IRange;
    console.log("selectedRange: "+this.selectedRange);
    
    switch (this.selectedRange) {
      case 1://Today
            range={label:"Today",
            endTime:moment().valueOf(),
            startTime: moment().subtract(1,'d').valueOf()
          };
          this._trendsService.LoadMetricsData(range);
          break;
      case 2://Last 3 Days
      range={label:"Last 3 Days",
            endTime:moment().valueOf(),
            startTime: moment().subtract(3,'d').valueOf()
          };
          this._trendsService.LoadMetricsData(range);
          break;
      case 3://Last Week
            range={label:"Last Week",
            endTime:moment().valueOf(),
            startTime: moment().subtract(7,'d').valueOf()
          };
          this._trendsService.LoadMetricsData(range);
          break;
          case 4://Last Month
          range={label:"Last Month",
            endTime:moment().valueOf(),
            startTime: moment().subtract(1,'months').valueOf()
          };
          this._trendsService.LoadMetricsData(range);
          break;
          case 5://Last 2 Month
          range={label:"Last 2 Month",
          endTime:moment().valueOf(),
          startTime: moment().subtract(2,'months').valueOf()
        };
        this._trendsService.LoadMetricsData(range);
          break;
      case 6://Last 3 Month
            range={label:"Last 3 Month",
            endTime:moment().valueOf(),
            startTime: moment().subtract(3,'months').valueOf()
            };
            this._trendsService.LoadMetricsData(range);
            break;
      case 7://Last 6 Month
            range={label:"Last 6 Month",
            endTime:moment().valueOf(),
            startTime: moment().subtract(6,'months').valueOf()
            };
            this._trendsService.LoadMetricsData(range);
            break;
      case 8://Last 9 Month
            range={label:"Last 9 Month",
            endTime:moment().valueOf(),
            startTime: moment().subtract(9,'months').valueOf()
            };
            this._trendsService.LoadMetricsData(range);
          break;
      case 9://Last 1 Year
            range={label:"Last 1 Year",
            endTime:moment().valueOf(),
            startTime: moment().subtract(1,'years').valueOf()
          };
          this._trendsService.LoadMetricsData(range);
          break;
      case 10://From - To
            const dialogRef = this.dialog.open(TimeRangeDilaogueComponent, {
              data: {name: "sedf", type: "user"}
            });
            
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed with this result: '+result.Result);
              if(result.Result)
              {
                range={label:"From - To",
                endTime:result.EndTime,
                startTime:result.StartTime
              };
              this._trendsService.LoadMetricsData(range);
              }
            });       
            break;
            
            default:
              console.log("No such Range exists!");
            break;
          }//switch
  }//onRangeSelection

  resetChart():void
  {
    this.trim=false;
    this.toppings.setValue([]);
    this.onTypeSelection(this.ChartType );
  }
}
