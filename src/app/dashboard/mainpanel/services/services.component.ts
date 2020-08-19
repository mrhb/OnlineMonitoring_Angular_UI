import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ServicesDataSource, ServicesItem } from './services-datasource';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ServicesItem>;
  dataSource: ServicesDataSource;
  sevicefilterIndx:number=0;
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','counter'];

  ngOnInit() {
    this.dataSource = new ServicesDataSource();

    this.dataSource.filterPredicate = 
    (data: ServicesItem, filter: string) => data.counter> parseInt(filter);
  
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public applyFilter = (value: string) => {   
    this.dataSource.filter = value.trim().toLocaleLowerCase();    
  }

  onClickMe(value: string) {
    //this.sevicefilterIndx=value;
    this.doFilter(value);
  }
}
