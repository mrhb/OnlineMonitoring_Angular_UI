import {ViewEncapsulation, Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DetailComponent implements OnInit {
  id: string;
  expantion:string="normal";
  sideOpen:boolean=false;
  constructor(    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }


}
