import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../management/services/message.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



import {  METRICS_amf25, METRICS_classic, METRICS_minit } from './mock-trends';
import { MetricInfo, SeriesInfo, TrendInfo } from './trendInfo';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { WeekDay } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

const baseTrendsUrl =environment.api+ '/trends/';
const baseSidebarUrl =environment.sidebar+ '/sidebar/';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {
selectedSeries:SeriesInfo={metricsInfo:[],startDate: moment().subtract(1,'d').valueOf(),endDate:moment().valueOf()};
trendsInfos:TrendInfo[];
metrics_classic:string[];
metrics_minit:string[];
metrics_amf25:string[];
constructor(private http: HttpClient,
    private messageService: MessageService
    ) {
    this.trendsInfos=[];    
    this.metrics_classic=METRICS_classic;
    this.metrics_minit=METRICS_minit;
    this.metrics_amf25=METRICS_amf25;
   }
   private log(message: string) {
   this.messageService.add(`UserService: ${message}`);
  }

  // getSeriesData(): Observable<any> {
  //   return this.http.get(baseTrendsUrl);
  // }

  /** POST: Send seriesInfo to get series data from timeseries database */
  getSeriesData(seriesInfo: SeriesInfo): Observable<any> {
  return this.http.post<SeriesInfo>(baseTrendsUrl, seriesInfo, httpOptions)
    .pipe(
      catchError(err => of([]))
    );
}


   getTrendsInfos(){
    return this.http.get<TrendInfo[]>(baseSidebarUrl,httpOptions)
    .pipe(
      catchError(err => of([]))
    );
    //   return this.trendsInfos;
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