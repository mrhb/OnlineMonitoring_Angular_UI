import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { StatesService } from '@app/unit/service/states.service';
import { MaintenanceTime, RemainingHour } from '@app/maintenance/service/maintenance';

// TODO: Replace this with your own data model type
export interface ServicesItem {
  unitName: string;
  maintenanceName: string;
  counter: number;

}
/**
 * Data source for the Services view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MaintenanceDataSource extends  MatTableDataSource<ServicesItem> {

  constructor(public statesService:StatesService)
  {
    super();

    this.statesService.UnitsDataSubject.subscribe(
      result=>{
      this.data=new MaintenanceTime(result.items).items;
    });

    
    this.filterPredicate = 
    (data: ServicesItem, filter: string) =>{
      switch(filter) { 
        case 'lessThan24': { 
          return data.counter<24;
            break; 
        } 
        case '24To299' : { 
          return (data.counter>=24)&&(data.counter<300);
           break; 
        } 
        case '300To599' : { 
          return (data.counter>=300)&&(data.counter<600);
          break; 
       } 
        case '600To999' : { 
          return data.counter>=600;
          break; 
     } 
        default: { 
          return true;
          break; 
        } 
     } 
    };
  }
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ServicesItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ServicesItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.maintenanceName, b.maintenanceName, isAsc);
        case 'unitName': return compare(+a.unitName, +b.unitName, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
