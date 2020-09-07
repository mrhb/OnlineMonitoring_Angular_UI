import { Component, OnInit, Input } from '@angular/core';
import { ViewComponent } from '../view.component';

@Component({
  selector: 'app-iconview',
  templateUrl: './iconview.component.html',
  styleUrls: ['./iconview.component.sass']
})
export class IconviewComponent implements ViewComponent,OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
