import {ViewEncapsulation, Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import{DetailesService}from '../service/Details.service'
import {detailsInto, unitDetailsInto } from '../service/unitDetailsData';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DetailComponent implements OnInit {
  id: string;
  details:detailsInto;
  expantion:string="normal";
  sideOpen:boolean=false;
  constructor(    private route: ActivatedRoute,
    private unitService:DetailesService,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
   //this.details=this.unitService.getDetails(this.id);

   this.unitService.DetailsInfoSubject.subscribe((data)=>{
      this.details=data;
  });

  this.unitService.startLodingPeriodically(this.id);


  //  this.unitService.get(this.id).subscribe(
  //   data => {
  //     this.details=new unitDetailsInto(data[0]).item;
  //     console.log(data);
  //   },
  //   error => {
  //     console.log(error);
  //   });
   //console.log(this.details);
  }


}
