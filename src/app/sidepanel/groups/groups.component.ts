import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  groupType: string;
  count: number;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {groupType: 'group_work', name: 'test', count: 1},
  {groupType: 'group_work', name: 'Testing ',   count: 4},
  {groupType: 'grade', name: 'webgroupsTest',  count: 6},
  {groupType: 'color_lens', name: 'WebGmm',count: 9},
  
];

/**
 * @title Table with selection
 */

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent  {
  displayedColumns: string[] = ['name', 'count'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.groupType + 1}`;
  }
}