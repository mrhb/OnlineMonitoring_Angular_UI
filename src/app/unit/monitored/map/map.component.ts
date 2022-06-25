import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import * as L from "leaflet";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/mapIcons/power-plant-48.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [38, 38],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


import { StatesService } from '../../service/states.service';
import { stateInto } from '../../service/UnitsData';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,AfterViewInit {
  @Input()  items:stateInto[];
  map:any;
  markersGroup;
  @ViewChild('map') mapContainer;
  
  units:stateInto[];

  constructor(
    private statesService:StatesService
  ) {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mapInit();

    this.statesService.UnitsDataSubject.subscribe((data)=>{
      if(data.items.length>0)
      {
        this.units = data.items;
        this.displayMap() ;
      }
    });    
    }

    mapInit()
    {
      var basemaplayer=L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
       { attribution: '...' }
      );
      this.markersGroup = L.layerGroup([]);
  
       this.map = L.map(this.mapContainer.nativeElement,{
        layers: [basemaplayer,  this.markersGroup ]
      });
    }
    displayMap() {
    this.markersGroup.clearLayers()

   var marers= this.units.map( item=>{
    var  Icon = L.icon({
      iconRetinaUrl:`assets/mapIcons/${item.state}.png`,
      iconUrl:`assets/mapIcons/${item.state}.png`,
      shadowUrl,
      iconSize: [38, 38],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    var tooltip= `${item.name}
       <br>RunHour:${item.Run_Hours}
       <br>Kwh:${item.Genset_kWh}`;
     var mar=L.marker([item.lat,item.long], {icon: Icon}).bindTooltip(tooltip, 
      {
        permanent: false
      });
     mar.addTo(this.markersGroup);
    return  mar;
    });

    
    var group = new L.featureGroup(marers);
    this.map.fitBounds(group.getBounds(),
    {padding: [50, 50]});
    // this.map.setZoom(9);
  }
}
