import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MetricInfo, SeriesInfo, TrendInfo, UnitInfo } from '../trendInfo';
import { TrendsService } from '../trends.service';

@Component({
  selector: 'trends-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SideComponent implements OnInit {

  dataSource : TrendInfo[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedUnit:UnitInfo=null; 
  selectedUnitMetrics: string[]=[];
  UnitMetrics: MetricInfo[]=[];

  columnsToDisplay = ['GroupName'];
  expandedElement: UnitInfo[];

  
  trends : TrendInfo[];
  trendsService:TrendsService;
  constructor(_trendsService:TrendsService) { 
    this.trendsService=_trendsService;
    
    this.trendsService.TrendsInfoSubject.subscribe(data=>{
      this.trends= data;
      this.dataSource =this.trends;
      console.log(data);
    },
    error => {
           console.log(error);
    
    })
  }
  
  ngOnInit(): void {
    this.dataSource =  this.trends;

  }
  selecteUnit(item:UnitInfo){
    if(this.selectedUnit==item)
    this.selectedUnit=null;
    else
    {
      this.selectedUnit=item;
    }
    
    this.UnitMetrics=this.trendsService.getUinitMetric(item);
  }
  selectedMetric(item:MetricInfo,checked:boolean){
  item.selected=checked;
  this.trendsService.updateList(item)
  }
onChange(event, item:SeriesInfo) {
}


}