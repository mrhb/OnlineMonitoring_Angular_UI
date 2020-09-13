import { Component, OnInit } from '@angular/core';
import { TrendInfo } from '../trendInfo';
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
    this.trends=this.trendsService.getUnitVariables(1);
  }
  
  ngOnInit(): void {
  }
selected(){
  this.trendsService.addToList(this.trends[1]);
}
}
