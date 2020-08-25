import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { BooleanInput } from '@angular/cdk/coercion';
import { UsersService } from '../services/users.service';


export interface PeriodicElement {
  position:number;
  name: string;
  id: string;
  email:string
  unitCount: number;
  lang:string;
  conn:number;
  reportsM:boolean;
  reportsW:boolean;
  api:boolean;
  isadmin:boolean
 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position:1,unitCount: 1, name: 'Hydrogen',email:'mmhajjar82@gmail.com' ,id:'mrhb',    lang:'En',conn:1,reportsM:true,reportsW:false,api:true,isadmin:true },
  {position:2,unitCount: 2, name: 'Helium'  ,email:'sdf_435@hotmail.com' ,id:'masdfrhb', lang:'En',conn:1,reportsM:true,reportsW:false,api:true,isadmin:false},
  {position:3,unitCount: 3, name: 'Lithium' ,email:'dfsced_def@yahoo.com' ,id:'mdfrhb',  lang:'En',conn:1,reportsM:true,reportsW:false,api:true,isadmin:false},
  
];

/**
 * @title Table with selection
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:PeriodicElement[];
  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(private UsersService: UsersService) { }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.UsersService.getAll()
      .subscribe(
        data => {
          this.users = data;
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}