import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { stateInto, unitsStateInfo } from './UnitsData';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
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

export class StatesService {


  public UnitsDataSubject: BehaviorSubject<unitsStateInfo>;
  public readonly UnitsData: Observable<unitsStateInfo>;
  constructor(
    private http: HttpClient
  ) {
    this.UnitsDataSubject = new BehaviorSubject<unitsStateInfo>(new unitsStateInfo([{"name":"rgtr5get5","id":"rfevfehrtbethb"}]));
    this.UnitsData = this.UnitsDataSubject.asObservable();
    this.Load();
  }
  
  public get UnitsDataValue(): unitsStateInfo {
    return this.UnitsDataSubject.value;
}
Load() {
   this.http.post<stateInto[]>(baseSidebarUrl, {}, httpOptions).subscribe((states)=>{
         this.UnitsDataSubject.next(new unitsStateInfo(states));
         console.log(this.UnitsDataSubject.value.items);
   })
      // .pipe(map(states => {
      //     this.UnitsDataSubject.next(new unitsStateInfo(states));
      //     return states;
      // }));
}

Download() : Observable<stateInto[]>{
    return this.http.post<stateInto[]>(baseSidebarUrl, {}, httpOptions);
  }

}
