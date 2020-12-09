import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import { MatDialogRef, MatDialog } from "@angular/material/dialog";

import { BooleanInput } from '@angular/cdk/coercion';
import { UnitsService } from '../services/units.service';
import { Unit } from '../services/unit';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  units:Unit[];
  displayedColumns: string[] = ['select', 'id', 'name','deviceType','state','netaddress','groups','customer','gate','disable','comm','actions'];
  dataSource = new MatTableDataSource<Unit>(this.units);
  selection = new SelectionModel<Unit>(true, []);

  constructor(private UnitsService: UnitsService,
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
    this.UnitsService.getAll()
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
  deleteUser( unit: Unit){

    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: {name: unit.name, type: "unit"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.UnitsService.delete(unit.id).subscribe();
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
  checkboxLabel(row?: Unit): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}