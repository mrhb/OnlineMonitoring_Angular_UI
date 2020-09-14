import { Component, OnInit } from '@angular/core';
import { SeriesInfo, TrendInfo } from '../trendInfo';
import { TrendsService } from '../trends.service';

@Component({
  selector: 'trends-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  trends : TrendInfo[];
  trendsService:TrendsService;
  constructor(_trendsService:TrendsService) { 
    this.trendsService=_trendsService;
    this.trends=this.trendsService.getTrendsInfos();
  }
  
  ngOnInit(): void {
  }
selected(item:SeriesInfo,checked:true){
  if(checked)
  this.trendsService.addToList(item);
  else
  this.trendsService.removeFromList(item);
}
onChange(event, item:SeriesInfo) {




}
}
