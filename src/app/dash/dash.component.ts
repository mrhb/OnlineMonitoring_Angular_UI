import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
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
