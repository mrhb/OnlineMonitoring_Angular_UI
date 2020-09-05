import { Component, OnInit } from '@angular/core';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import "leaflet/dist/images/marker-shadow.png";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

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
  }

}
