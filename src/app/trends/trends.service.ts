import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../management/services/message.service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';



import {  METRICS_amf25, METRICS_classic, METRICS_minit } from './mock-trends';
import { MetricInfo, SeriesInfo, TrendInfo, UnitInfo } from './trendInfo';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { WeekDay } from '@angular/common';
import { IRange } from './range';
import { Unit } from '@app/management/services/unit';

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
      // this.LoadMetrics();
        

   }
   private log(message: string) {
   this.messageService.add(`UserService: ${message}`);
  }
  
  LoadMetricsData(range:IRange) {
    this.selectedSeries.startDate=range["startTime"];
    this.selectedSeries.endDate=range["endTime"];
    this.LoadMetrics();
  }
  public LoadMetrics() {
    
    this.selectedSeries
    var seriesReq:SeriesInfo={
      startDate:this.selectedSeries.startDate,
      endDate:this.selectedSeries.endDate,
      metricsInfo:this.selectedSeries.metricsInfo.filter(p=>p.selected===true)
    }
    /** POST: Send seriesInfo to get series data from timeseries database */
    this.http.post<SeriesInfo>(baseTrendsUrl,seriesReq, httpOptions).subscribe((data)=>{
    this.metricsDataSubject.next(data);
    });
  }

  LoadTrendsInfo() {
    return this.http.get<TrendInfo[]>(baseSidebarUrl,httpOptions)
    .subscribe((Infos)=>{
      localStorage.setItem('TrendsInfo', JSON.stringify(Infos));
      this.  TrendsInfoSubject.next(Infos);
    
      if(Infos[0].UnitsInfo[0])
      {
        var unit=Infos[0].UnitsInfo[0];
        this.getUnitMetric(unit);
        var metricName=this.getFavoritMetric(unit.deviceType);
        var   metric:MetricInfo={
          Unit:unit,
          metricName:metricName,
          selected:true
        };
        this.updateList(metric)
      }

      this.LoadMetrics();

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
  getUnitMetric(unit:UnitInfo){
    this.selectedSeries.metricsInfo=[];
    var merticnames=[]
        if(unit.deviceType.valueOf()=="mint")
        merticnames=this.metrics_minit;
        else if(unit.deviceType.valueOf()=="amf25")
        merticnames=this.metrics_amf25;
        else
        merticnames=this.metrics_classic;

    merticnames.forEach((m)=>{
      var   metric:MetricInfo={
        Unit:unit,
        metricName:m,
        selected:false
      };
        this.selectedSeries.metricsInfo.push(metric);
      }
    );
    return this.selectedSeries.metricsInfo;
  }
  updateList(item:MetricInfo){
    let index = this.selectedSeries.metricsInfo.findIndex(m =>item.metricName==m.metricName);
    this.selectedSeries.metricsInfo[index] = item;
    this.LoadMetrics();
  }
  getSelected(){
    return this.selectedSeries.metricsInfo.filter(m=> m.selected===true)}

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