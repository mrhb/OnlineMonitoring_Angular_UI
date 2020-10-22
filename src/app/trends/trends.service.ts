import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../management/services/message.service';
import { Observable } from 'rxjs';


import { TRENDSINFO } from './mock-trends';
import { MetricInfo, SeriesInfo, TrendInfo } from './trendInfo';
import { environment } from '../../environments/environment';

const baseUrl =environment.api+ '/trends/';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {
selectedSeries:SeriesInfo={metricsInfo:[],startDate:null,endDate:null};
trendsInfos:TrendInfo[];
  constructor(private http: HttpClient,
    private messageService: MessageService
    ) {
    this.trendsInfos=TRENDSINFO;    
   }
   private log(message: string) {
   this.messageService.add(`UserService: ${message}`);
  }

  getSeriesData(): Observable<any> {
    return this.http.get(baseUrl);
  }
  getUnitSeries(groupId:number,unitId:number) { 
    let group:TrendInfo = this.trendsInfos.find(i => i.GroupId === groupId);
    let unit = group.UnitsSeriesInfo.find(i => i.UnitId === unitId);
    return unit.variables;
   }
   getTrendsInfos(){
     return this.trendsInfos;
   }
  addToList(item:MetricInfo){
    this.selectedSeries.metricsInfo.push(item);
  }
  removeFromList(item:MetricInfo){
    const index = this.selectedSeries.metricsInfo.indexOf(item, 0);
    if (index > -1) {
      this.selectedSeries.metricsInfo.splice(index, 1);
    }

    this.selectedSeries.push(item);
  }
  getSelected(){return this.selectedSeries}
}
