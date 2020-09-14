import { Injectable } from '@angular/core';
import { TRENDSINFO } from './mock-trends';
import { SeriesInfo, TrendInfo } from './trendInfo';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {
selectedSeries:SeriesInfo[]=[];
trendsInfos:TrendInfo[];
  constructor() {
    this.trendsInfos=TRENDSINFO;
   }
  getUnitSeries(groupId:number,unitId:number) { 
    let group:TrendInfo = this.trendsInfos.find(i => i.GroupId === groupId);
    let unit = group.UnitsSeriesInfo.find(i => i.UnitId === unitId);
    return unit.variables;
   }
   getTrendsInfos(){
     return this.trendsInfos;
   }
  addToList(item:SeriesInfo){
    this.selectedSeries.push(item);
  }
  removeFromList(item:SeriesInfo){
    const index = this.selectedSeries.indexOf(item, 0);
    if (index > -1) {
      this.selectedSeries.splice(index, 1);
    }

    this.selectedSeries.push(item);
  }
  getSelected(){return this.selectedSeries}
}
