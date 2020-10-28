import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../management/services/message.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



import { METRICS, TRENDSINFO } from './mock-trends';
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

const baseUrl =environment.api+ '/trends/';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {
selectedSeries:SeriesInfo={metricsInfo:[],startDate: moment().subtract(1,'d').valueOf(),endDate:moment().valueOf()};
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

  // getSeriesData(): Observable<any> {
  //   return this.http.get(baseUrl);
  // }

  /** POST: Send seriesInfo to get series data from timeseries database */
  getSeriesData(seriesInfo: SeriesInfo): Observable<any> {
  return this.http.post<SeriesInfo>(baseUrl, seriesInfo, httpOptions)
    .pipe(
      catchError(err => of([]))
    );
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