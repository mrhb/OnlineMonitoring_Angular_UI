import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { SeriesInfo } from '../../trendInfo';
import { trendViewComponent } from '../trendView.Cmponent';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      first: [],
      second: []
    })
  }

}
