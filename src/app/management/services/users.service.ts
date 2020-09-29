import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


import { MessageService } from './message.service';

const baseUrl =environment.api+ '/users/';
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
    return this.http.get("http://localhost:3600/users");

   // return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  
  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}
