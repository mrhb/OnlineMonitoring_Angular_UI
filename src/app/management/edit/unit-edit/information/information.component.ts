import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'unit-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  infoformGroup :FormGroup ; 
  nameformGroup :FormGroup ; 
  mapformGroup :FormGroup ; 

  constructor() { }

  ngOnInit(): void {
    this.nameformGroup=new FormGroup({
      name: new FormControl(),
      state: new FormControl("true")
   });
   this.infoformGroup=new FormGroup({
    name: new FormControl(),
    state: new FormControl("false")
 });
 this.mapformGroup=new FormGroup({
  name: new FormControl(),
  state: new FormControl("false")
});
  }

}
