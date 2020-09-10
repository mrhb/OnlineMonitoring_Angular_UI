import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'monitored-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  @Input() sideType:string="";

  name:string="Unit 1";
 filterVisible:boolean=false;
 unitMiniDetailVisible:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(){
    switch (this.sideType) {

      case "miniDetail":
        this.filterVisible=false;
        this.unitMiniDetailVisible=true;
        break;
      default:
        this.filterVisible=true;
        this.unitMiniDetailVisible=false;
        break;
    }

  }

}
