﻿import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { StatesService } from '@app/unit/service/states.service';
import { TrendsService } from '@app/trends/trends.service';

import Notiflix from "notiflix-angular";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    private ownersSubject: BehaviorSubject<User[]>;
    public owners: Observable<User[]>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private statesService:StatesService,
        private trendsService:TrendsService

    ) {
       var  last_user:User=JSON.parse(localStorage.getItem('user')) ;
        this.userSubject = new BehaviorSubject<User>(last_user);
        this.user = this.userSubject.asObservable();

        this.ownersSubject = new BehaviorSubject<User[]>(JSON.parse(localStorage.getItem('owners')));
        this.owners = this.ownersSubject.asObservable();

        //this.setOwnerId(last_user.ownerId) ;
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<User>(`${environment.authUrl}/auth`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);

                this.getOwners() ;
                this.statesService.LoadStateReq();
                this.trendsService.LoadTrendsInfo();
                return user;
            }));
        }
        
        getOwners() {
            return this.http.get<User[]>(`${environment.authUrl}/auth/owners`).subscribe({
                next:  data => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    var owners_string= JSON.stringify(data);
                    localStorage.setItem('owners',owners_string);
                    this.ownersSubject.next(data);
                },
                error: error => {
                    console.log(error);
                }
            });
    }
    
    setOwnerId(ownerId: string) {
        this.http.post<any>(`${environment.authUrl}/auth/setOwnerId`, { ownerId}).subscribe({
            next: user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
    Notiflix.Notify.Success('page Owner has been set');
            
            this.getOwners() ;
            this.statesService.LoadStateReq();
            this.trendsService.LoadTrendsInfo();
        }
    });
    }

    signup(firstName:string,lastName:string,address:string,email: string, password: string) {
        var endpoint=`${environment.authUrl}/api/users`;
        var permissionLevel=1;
        return this.http.post<any>(endpoint, { email, firstName,lastName,password ,permissionLevel});
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);

        localStorage.removeItem('owners');
        this.ownersSubject.next(null);
        this.router.navigate(['/login']);
    }
}