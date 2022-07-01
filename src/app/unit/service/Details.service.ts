import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { stateInto, unitsStateInfo } from './UnitsData';
import { unitDetailsInto } from './unitDetailsData';

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
  constructor(
    private http: HttpClient
  ){}
  
  get(id): Observable<any> {
    return this.http.get(`${baseSidebarUrl}get-details-by-unitId/${id}`);
  }
  getDetails(id): unitDetailsInto {
     var details=this.http.get(`${baseSidebarUrl}get-details-by-unitId/${id}`);
      return new unitDetailsInto(details);
  }

  // Load(http: HttpClient,UnitsDataSubject :BehaviorSubject<unitsStateInfo> ) {
  //   http.post<stateInto[]>(baseSidebarUrl, {}, httpOptions).subscribe((states)=>{
  //     new unitDetailsInto(states);
  //   })
  // }

}
