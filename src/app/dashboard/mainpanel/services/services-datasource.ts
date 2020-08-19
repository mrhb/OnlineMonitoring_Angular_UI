import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ServicesItem {
  id: string;
  name: string;
  counter: number;

}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ServicesItem[] = [
  {id: 'unit 1', name: 'Maintenance 1' , counter: 0   },
  {id: 'unit 2', name: 'Maintenance 1' , counter: 276 },
  {id: 'unit 3', name: 'Service Time 1', counter: 300 },
  {id: 'unit 4', name: 'Maintenance 1' , counter: 300 },
  {id: 'unit 4', name: 'Maintenance 1' , counter: 300 },
 
];

/**
 * Data source for the Services view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ServicesDataSource extends  MatTableDataSource<ServicesItem> {
  data: ServicesItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;



  constructor() {
    super();
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
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
