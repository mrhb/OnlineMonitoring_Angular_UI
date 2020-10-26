import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../management/services/message.service';
import { Observable } from 'rxjs';


import { METRICS, TRENDSINFO } from './mock-trends';
import { MetricInfo, SeriesInfo, TrendInfo } from './trendInfo';
import { environment } from '../../environments/environment';

const baseUrl =environment.api+ '/trends/';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {
selectedSeries:SeriesInfo={metricsInfo:[],startDate:null,endDate:null};
trendsInfos:TrendInfo[];
metrics:string[];
constructor(private http: HttpClient,
    private messageService: MessageService
    ) {
    this.trendsInfos=TRENDSINFO;    
    this.metrics=METRICS;
   }
   private log(message: string) {
   this.messageService.add(`UserService: ${message}`);
  }

  getSeriesData(): Observable<any> {
    return this.http.get(baseUrl);
  }

   getTrendsInfos(){
     return this.trendsInfos;
   }

   getUinitMetric(unitId){
    this.selectedSeries.metricsInfo=[];
    return this.metrics;
  }
  addToList(item:MetricInfo){
    this.selectedSeries.metricsInfo.push(item);
  }
  removeFromList(item:MetricInfo){
   // const index = this.selectedSeries.metricsInfo.indexOf(item, 0);
    const index = this.selectedSeries.metricsInfo.findIndex(x => x.Unit ===item.Unit && x.Measurment===item.Measurment);

    if (index > -1) {
      this.selectedSeries.metricsInfo.splice(index, 1);
    }

  }
  getSelected(){return this.selectedSeries}
}
