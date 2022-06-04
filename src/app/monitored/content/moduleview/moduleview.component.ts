import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ViewComponent } from '../view.component';

@Component({
  selector: 'app-moduleview',
  templateUrl: './moduleview.component.html',
  styleUrls: ['./moduleview.component.sass']
})
export class ModuleviewComponent implements ViewComponent,OnInit {
  @Output() unitSelectionEvent = new EventEmitter<String>();

  constructor() { }
  ngOnInit(): void {
  }

}
