import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import * as L from "leaflet";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


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
  ) {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.map = L.map(this.mapContainer.nativeElement);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     { attribution: '...' }
    ).addTo(this.map);
    
    
    this.statesService.UnitsDataSubject.subscribe((data)=>{
      if(data.items.length>0)
      {
        this.units = data.items;
        this.displayMap() ;
      }
    });    
    }
  displayMap(): void {

   var marers= this.units.map( item=>{
     var mar=L.marker([item.lat,item.long]);
     mar.addTo(this.map);
    return  mar;
    });

        
    var group = new L.featureGroup(marers);
    this.map.fitBounds(group.getBounds(),
    {padding: [20, 20]});
  }
}
