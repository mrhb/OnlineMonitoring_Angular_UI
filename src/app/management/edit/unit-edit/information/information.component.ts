import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';


@Component({
  selector: 'unit-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  infoformGroup :FormGroup ; 
  nameformGroup :FormGroup ; 
  mapformGroup :FormGroup ; 

  options = {
    layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        marker([ 36.250091, 59.914066])
    ],
    zoom: 8,
    center: latLng(36.250091, 59.914066)
};


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
