import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


import { MessageService } from './message.service';

const baseUrl =environment.userUrl+ '/api/users';
const baseProfileUrl =environment.userUrl+ '/api/profile';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
    private messageService: MessageService) { }
    
    private log(message: string) {
      this.messageService.add(`UserService: ${message}`);
    }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);

   // return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  
  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  set_avatar(id,avatar): Observable<any> {
    return this.http.post(`${baseProfileUrl}/set-avatar/${id}`, avatar);
  }
  set_password(id,passData): Observable<any> {
    return this.http.patch(`${baseProfileUrl}/set-pass/${id}`, passData);
  }
  update(id, data): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
