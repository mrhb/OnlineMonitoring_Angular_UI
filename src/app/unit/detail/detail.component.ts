import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  expantion:string="normal";
  sideOpen:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
