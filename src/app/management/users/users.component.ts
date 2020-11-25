import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';



import { BooleanInput } from '@angular/cdk/coercion';
import { UsersService } from '../services/users.service';
import { User } from '../services/user';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { Unit } from '../services/unit';
import { HttpClient } from '@angular/common/http';

/**
 * @title Table with selection
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  formGroup :FormGroup ; 

  users:User[];
  displayedColumns: string[] = ['select', 'id', 'firstname','lastname','email','unitCount','lang','conn','reportsM','reportsW','api','isadmin','actions'];
  dataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(true, []);


 
  constructor(private UsersService: UsersService,
    public dialog: MatDialog,
    public http:HttpClient) { }

    

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  ngOnInit(): void {
    this.retrieveUsers();
    this.formGroup=new FormGroup({
     action: new FormControl(),
     value: new FormControl()
   });

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
  deleteUser( user: Unit){

    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: {name: user.name, type: "user"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.UsersService.delete(user.id).subscribe();
        this.retrieveUsers();
      } 

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