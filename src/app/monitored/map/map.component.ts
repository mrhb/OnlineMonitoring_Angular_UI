import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import * as L from "leaflet";

import "src/assets/mapIcons/marker-shadow.png"
import { StatesService } from '../service/states.service';
import { stateInto } from '../service/UnitsData';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,AfterViewInit {
  @Input()  items:stateInto[];
  map:any;
  @ViewChild('map') mapContainer;
  
  units:stateInto[];

  constructor(
    private statesService:StatesService
  ) { }

  ngOnInit(): void {
    this.statesService.UnitsDataSubject.subscribe((data)=>{
      if(data.items.length>1)
      {
        this.units = data.items;
        this.displayMap() ;
      }
    });
  }

  ngAfterViewInit(): void {
    this.mapInit();
    }
  displayMap(): void {

   var marers= this.units.map( item=>{
     var mar=marker([item.lat,item.long]);
     mar.addTo(this.map);
    return  mar;
    });

        
    var group = new L.featureGroup(marers);
    this.map.fitBounds(group.getBounds(),
    {padding: [20, 20]});
  }

  mapInit()
  {
    this.map = L.map(this.mapContainer.nativeElement);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     { attribution: '...' }
    ).addTo(this.map);

  }
}
