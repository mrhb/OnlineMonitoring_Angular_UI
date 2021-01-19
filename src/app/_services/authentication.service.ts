import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    private ownersSubject: BehaviorSubject<User[]>;
    public owners: Observable<User[]>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();

        this.ownersSubject = new BehaviorSubject<User[]>(JSON.parse(localStorage.getItem('owners')));
        this.owners = this.ownersSubject.asObservable();
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
                return user;
            }));
    }

    getOwners() {
        return this.http.get<User[]>(`${environment.authUrl}/auth/owners`).subscribe({
            next:  data => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                var owners_string= JSON.stringify(data);
                console.log(owners_string);
                localStorage.setItem('owners',owners_string);
                this.ownersSubject.next(data);
            },
            error: error => {
                console.log(error);
            }
        });
    }

    setOwnerId(ownerId: string) {
        return this.http.post<any>(`${environment.authUrl}/auth/setOwnerId`, { ownerId})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
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