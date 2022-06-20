import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'monitored-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  @Input() unitId:string="";
  @Input() sideType:string="";
  @Output() closeEvent = new EventEmitter();

  name:string="Unit 1";
 filterVisible:boolean=false;
 unitMiniDetailVisible:boolean=false;
  constructor() { }
  onCloseClick(){
  this.closeEvent.emit();
}
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
