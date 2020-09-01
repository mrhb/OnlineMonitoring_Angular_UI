import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { UserPermit } from 'src/app/management/services/user-permit';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Unit } from 'src/app/management/services/unit';
import { UsersPermitsService } from '../../../services/users-permits.service';


@Component({
  selector: 'user-edit-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  myGroup :FormGroup ; 
  users:UserPermit[];
  displayedColumns: string[] = ['select', 'name','sd','allalarm','read','control','modify','actions'];
  dataSource = new MatTableDataSource<UserPermit>(this.users);
  selection = new SelectionModel<UserPermit>(true, []);
  constructor(private UnitsPermitService: UsersPermitsService) { }

  ngOnInit(): void {
    

    this.myGroup = new FormGroup({
      name  :new FormControl(),  
      sd  :new FormControl(true),  
      allAlarm:new FormControl(true),
      read    :new FormControl(true),  
      control :new FormControl(true),
      modify  :new FormControl(true),
   });
   this.retrieveUsers();

  }
  retrieveUsers(): void {
    this.UnitsPermitService.getAll()
      .subscribe(
        data => {
          this.users = data;
          this.dataSource = new MatTableDataSource<UserPermit>(this.users);
          this.selection = new SelectionModel<UserPermit>(true, []);
          console.log(data);
        },
        error => {
          console.log(error);
        });

        
  }
  removeunit( user: UserPermit){
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserPermit): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}