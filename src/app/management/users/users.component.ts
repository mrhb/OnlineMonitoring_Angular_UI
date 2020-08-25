import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { BooleanInput } from '@angular/cdk/coercion';
import { UsersService } from '../services/users.service';
import { User } from '../services/user';

/**
 * @title Table with selection
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:User[];
  displayedColumns: string[] = ['select', 'id', 'name','loginId','email','unitCount','lang','conn','reportsM','reportsW','api','isadmin'];
  dataSource = new MatTableDataSource<User>(this.users);
  selection = new SelectionModel<User>(true, []);

  constructor(private UsersService: UsersService) { }
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
          this.users = data;
          this.dataSource = new MatTableDataSource<User>(this.users);
          this.selection = new SelectionModel<User>(true, []);
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
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}