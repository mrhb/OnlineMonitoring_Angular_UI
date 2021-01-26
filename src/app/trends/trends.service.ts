import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../management/services/message.service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';



import {  METRICS_amf25, METRICS_classic, METRICS_minit } from './mock-trends';
import { MetricInfo, SeriesInfo, TrendInfo } from './trendInfo';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { WeekDay } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const baseTrendsUrl =environment.api+ '/trends/';
const baseSidebarUrl =environment.sidebar+ '/sidebar/';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {
selectedSeries:SeriesInfo={metricsInfo:[],startDate: moment().subtract(1,'d').valueOf(),endDate:moment().valueOf()};
trendsInfos:TrendInfo[]=[];
metrics_classic:string[]=METRICS_classic;
metrics_minit:string[]=METRICS_minit;
metrics_amf25:string[]=METRICS_amf25;

public TrendsInfoSubject: BehaviorSubject<TrendInfo[]>;
public metricsDataSubject: BehaviorSubject<any>=new BehaviorSubject<any>([]);

constructor(private http: HttpClient,
    private messageService: MessageService
    ) {
      if(JSON.parse(localStorage.getItem('TrendsInfo')))
      {
      this.TrendsInfoSubject = new BehaviorSubject<TrendInfo[]>(
        JSON.parse(localStorage.getItem('TrendsInfo')));
      }else
      this.TrendsInfoSubject = new BehaviorSubject<TrendInfo[]>([]);

   }
   private log(message: string) {
   this.messageService.add(`UserService: ${message}`);
  }
  
  LoadSeriesData() {
    var seriesInfo: SeriesInfo=this.getSelected();
    /** POST: Send seriesInfo to get series data from timeseries database */
    this.http.post<SeriesInfo>(baseTrendsUrl, seriesInfo, httpOptions).subscribe((data)=>{
    this.metricsDataSubject.next(data);
    });
  }

  LoadTrendsInfo() {
    return this.http.get<TrendInfo[]>(baseSidebarUrl,httpOptions)
    .subscribe((Infos)=>{
      localStorage.setItem('TrendsInfo', JSON.stringify(Infos));
      this.  TrendsInfoSubject.next(Infos);

      this.selectedSeries.metricsInfo=[];
      Infos.forEach((info)=> {
        info.UnitsInfo.forEach((unit)=> {
            var measurment=this.getFavoritMetric(unit.deviceType);
            var   metric:MetricInfo={
              Unit:unit,
              Measurment:measurment
            };
            this. addToList(metric);
          })
      });
    })
  }

  getFavoritMetric(unitType){
    if(unitType=="mint")
    return"Gen_kW";
    if(unitType=="amf25")
    return"Load_kW";
    else
    return"Power";
  }
  getUinitMetric(unitType){
    this.selectedSeries.metricsInfo=[];
    if(unitType=="mint")
    return this.metrics_minit;
    if(unitType=="amf25")
    return this.metrics_amf25;
    else
    return this.metrics_classic;
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
  
  

  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
  }
}