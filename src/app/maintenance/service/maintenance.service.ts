import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Maintenance,OneUnitMaintenanceInfo } from './maintenance';

const baseUrl =environment.userUrl+ '/api/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  getAllMaintenances(): Observable<OneUnitMaintenanceInfo[]> {
    return this.http.get<OneUnitMaintenanceInfo[]>(baseUrl);
  }

  getMaintenance(id): Observable<any> {
    return this.http.get<OneUnitMaintenanceInfo>(`${baseUrl}/${id}`);
  }

  public updateMaintenanceById(id, data: Maintenance[]): Observable<any> {
    return this.http.patch<OneUnitMaintenanceInfo>(`${baseUrl}/${id}`, data);
  }
}
