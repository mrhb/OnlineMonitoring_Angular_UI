import { Component, OnInit } from '@angular/core';
import { SeriesData, SeriesInfo } from '../../trendInfo';
import{trendViewComponent} from '../trendView.Cmponent'
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements trendViewComponent, OnInit {

  constructor() { }
  seriesInfo: SeriesInfo[];
  seriesData: SeriesData;
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
   Tools=[
     { value: 1, label: 'Reload all data'},
    { value: 2, label: 'Export data as XLSX'},
  ];
  ngOnInit(): void {
  }

}
