import { Component, OnInit, Input } from '@angular/core';
import { ViewComponent } from '../view.component';

@Component({
  selector: 'app-moduleview',
  templateUrl: './moduleview.component.html',
  styleUrls: ['./moduleview.component.sass']
})
export class ModuleviewComponent implements ViewComponent,OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
