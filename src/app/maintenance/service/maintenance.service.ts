import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Maintenance,MaintenanceInfo } from './maintenance';

const baseUrl =environment.userUrl+ '/api/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  getAllMaintenances(): Observable<MaintenanceInfo[]> {
    return this.http.get<MaintenanceInfo[]>(baseUrl);
  }

  getMaintenance(id): Observable<any> {
    return this.http.get<MaintenanceInfo>(`${baseUrl}/${id}`);
  }

  updateMaintenanceById(id, data): Observable<any> {
    return this.http.patch<MaintenanceInfo>(`${baseUrl}/${id}`, data);
  }
}
