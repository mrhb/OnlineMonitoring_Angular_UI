import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ViewComponent } from '../view.component';

@Component({
  selector: 'app-iconview',
  templateUrl: './iconview.component.html',
  styleUrls: ['./iconview.component.sass']
})
export class IconviewComponent implements ViewComponent,OnInit {
  @Output() unitSelectionEvent = new EventEmitter<String>();

  constructor() { }
  ngOnInit(): void {
  }

}