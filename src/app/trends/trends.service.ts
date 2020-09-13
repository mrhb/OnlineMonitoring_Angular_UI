import { Injectable } from '@angular/core';
import { TRENDS } from './mock-trends';
import { TrendInfo } from './trendInfo';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {
selectedtrends:TrendInfo[]=[];
  constructor() { }
  getUnitVariables(unitId:number) { return TRENDS; }
  addToList(item:TrendInfo){
    this.selectedtrends.push(item);
  }
  getSelected(){return this.selectedtrends}
}
