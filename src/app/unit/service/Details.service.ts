import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { stateInto, unitsStateInfo } from './UnitsData';
import { detailsInto, unitDetailsInto } from './unitDetailsData';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


const baseSidebarUrl =environment.sidebar+ '/sidebar/';

const view_DATA: stateInto[] = [

  Object.assign(new stateInto, 
    {
      itemName: 'unit 2',
      engines:'ready',
      update:1,
      subunits:[],
      alarm:{name:'*Emergency stop', Icon:'warning'}
    }),
    Object.assign(new stateInto, 
  {
    itemName: 'unit 3',
    engines:'(3)',
    update:3,
    subunits:[],
    alarm:{name:'*WrnServiceTime',Icon:'ECU'}
  })
]
@Injectable({
  providedIn: 'root'
})
//UnitsData[]

export class DetailesService {
  public DetailsInfoSubject: BehaviorSubject<detailsInto>;
  constructor(
    private http: HttpClient
  ){
    this.DetailsInfoSubject = new BehaviorSubject<detailsInto>(
      new detailsInto()
      );
  }
  
  get(id): Observable<any> {
    return this.http.get(`${baseSidebarUrl}get-details-by-unitId/${id}`);
  }
  startLodingPeriodically(id:string)
  {
    this.Load(this.http,this.DetailsInfoSubject,id);
    setInterval(this.Load,10000,this.http,this.DetailsInfoSubject,id);

  }

  Load(http: HttpClient,UnitsDataSubject :BehaviorSubject<detailsInto>,id:string ) {
    http.get(`${baseSidebarUrl}get-details-by-unitId/${id}`).subscribe((states)=>{
     UnitsDataSubject.next(new unitDetailsInto(states).item);
   })
 }
 
  getDetails(id:string): unitDetailsInto {
     var details=this.http.get(`${baseSidebarUrl}get-details-by-unitId/${id}`);
      return new unitDetailsInto(details);
  }

  // Load(http: HttpClient,UnitsDataSubject :BehaviorSubject<unitsStateInfo> ) {
  //   http.post<stateInto[]>(baseSidebarUrl, {}, httpOptions).subscribe((states)=>{
  //     new unitDetailsInto(states);
  //   })
  // }

}
