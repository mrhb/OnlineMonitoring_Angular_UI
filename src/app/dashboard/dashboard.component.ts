
  import { Component } from '@angular/core';
  import { map } from 'rxjs/operators';
  import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
  
  @Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
  })
  export class DashboardComponent {
  
    /** Based on the screen size, switch from standard to one column per row */
    cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return {
            
            columns: 1,
            miniCard: { cols: 1, rows: 1 },
            chart: { cols: 1, rows: 2 },
            table: { cols: 1, rows: 4 },
          };
        }
   
       return {
        columns: 3,
          summery:{title: 'statistic summery',cols: 2, rows: 1},
          alarm: { title: 'Alarms', cols: 1, rows: 3 },
          power:{ title: 'Active Power Output', cols: 1, rows: 1 },
          service:{ title: 'Service Time Filter', cols: 1, rows: 1 },
          comments: { title: 'Active Comments', cols: 1, rows: 1 },
          state:{ title: 'Engin State', cols: 1, rows: 1 },
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 2, rows: 2 },
          table: { cols: 4, rows: 4 },
        };
      })
    );
    
    /** Based on the screen size, switch from standard to one column per row */
    cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { title: 'Card 1', cols: 2, rows: 1 },
            { title: 'Card 4', cols: 1, rows: 3 },
            { title: 'Card 2', cols: 1, rows: 1 },
            { title: 'Card 3', cols: 1, rows: 1 },
            { title: 'Card 5', cols: 1, rows: 1 },
            { title: 'Card 6', cols: 1, rows: 1 },
          ];
        }
  
        return [
          { title: 'statistic summery', cols: 2, rows: 1 },
          { title: 'Alarms', cols: 1, rows: 3 },
          { title: 'Active Power Output', cols: 1, rows: 1 },
          { title: 'Service Time Filter', cols: 1, rows: 1 },
          { title: 'Active Comments', cols: 1, rows: 1 },
          { title: 'Engin State', cols: 1, rows: 1 },
        ];
      })
    );
  
    constructor(private breakpointObserver: BreakpointObserver) {}
  }
  