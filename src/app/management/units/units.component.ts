import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { BooleanInput } from '@angular/cdk/coercion';
import { UnitsService } from '../services/units.service';
import { Unit } from '../services/unit';
@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  units:Unit[];
  displayedColumns: string[] = ['select', 'id', 'name','groups','customer','gate','disable','comm'];
  dataSource = new MatTableDataSource<Unit>(this.units);
  selection = new SelectionModel<Unit>(true, []);

  constructor(private UsersService: UnitsService) { }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.UsersService.getAll()
      .subscribe(
        data => {
          this.units = data;
          this.dataSource = new MatTableDataSource<Unit>(this.units);
          this.selection = new SelectionModel<Unit>(true, []);
          console.log(data);
        },
        error => {
          console.log(error);
        });

        
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Unit): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}