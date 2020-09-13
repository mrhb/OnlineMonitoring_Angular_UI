import { Component, OnInit } from '@angular/core';
import { TrendInfo } from '../trendInfo';
import { TrendsService } from '../trends.service';

@Component({
  selector: 'trends-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class TrendsContentComponent implements OnInit {
  trends : TrendInfo[];
  constructor(_trendsService:TrendsService) {
    this.trends=_trendsService.getSelected();
   }

  ngOnInit(): void {
  }

}
