import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { BooleanInput } from '@angular/cdk/coercion';
import { GroupsService } from '../services/groups.service';
import { Group } from '../services/group';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups:Group[];
  displayedColumns: string[] = ['select', 'id', 'name','actions'];
  dataSource = new MatTableDataSource<Group>(this.groups);
  selection = new SelectionModel<Group>(true, []);

  constructor(private GroupService: GroupsService,
    public dialog: MatDialog) { }
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
    this.GroupService.getAll()
      .subscribe(
        data => {
          this.groups = data;
          this.dataSource = new MatTableDataSource<Group>(this.groups);
          this.selection = new SelectionModel<Group>(true, []);
          console.log(data);
        },
        error => {
          console.log(error);
        });        
  }

  deleteUser( group: Group){

    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: {name: group.name, type: "group"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.GroupService.delete(group.id).subscribe();
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
  checkboxLabel(row?: Group): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}