import { Component, OnInit } from '@angular/core';
import { SeriesInfo } from '../../trendInfo';
import{trendViewComponent} from '../trendView.Cmponent'
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.sass']
})
export class TableViewComponent implements trendViewComponent, OnInit {

  constructor() { }
  data: SeriesInfo[];

  ngOnInit(): void {
  }

}
