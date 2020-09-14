import { Component, OnInit } from '@angular/core';
import { SeriesInfo, TrendInfo } from '../trendInfo';
import { TrendsService } from '../trends.service';

@Component({
  selector: 'trends-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class TrendsContentComponent implements OnInit {
  series : SeriesInfo[];
  constructor(_trendsService:TrendsService) {
    this.series=_trendsService.getSelected();
   }

  ngOnInit(): void {
  }

}
