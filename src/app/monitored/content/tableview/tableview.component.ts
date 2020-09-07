import { Component, OnInit, Input } from '@angular/core';
import{ViewComponent} from '../view.component'

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.sass']
})
export class TableviewComponent implements ViewComponent,OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
