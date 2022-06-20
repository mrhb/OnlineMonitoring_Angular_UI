import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import{ViewComponent} from './view.component'
import{stateInto,unitsStateInfo} from './../service/UnitsData';
import { TableviewComponent } from './tableview/tableview.component';
import { ViewUnitsDirective } from './view-units.directive';
import { IconviewComponent } from './iconview/iconview.component';
import { ModuleviewComponent } from './moduleview/moduleview.component';
import{StatesService} from '../service/states.service';
import { Observable,of } from 'rxjs';
import { UnitsService } from '@app/management/services/units.service';
import { Unit } from '@app/management/services/unit';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() ViewType: string;
  @Output() unitSelectionEvent = new EventEmitter<String>(); 
  @ViewChild(ViewUnitsDirective, {static: true}) appViewUnits: ViewUnitsDirective;

  units:stateInto[];
 
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    ){

    }
  onUnitSelection(id:String) {
    this.unitSelectionEvent.emit(id);

  }
  ngOnInit(): void {
  }
  ngOnChanges() {
    this.LoadView(this.ViewType) ;    
  }
  LoadView(Type:string) {
    const viewContainerRef = this.appViewUnits.viewContainerRef;
    viewContainerRef.clear();

    let componentFactory : any;//this.componentFactoryResolver.resolveComponentFactory(TableviewComponent);
    switch(Type) { 
      case "table": { 
           componentFactory = this.componentFactoryResolver.resolveComponentFactory(TableviewComponent);
        //statements; 
        break; 
      } 
      case "icon": { 
         componentFactory = this.componentFactoryResolver.resolveComponentFactory(IconviewComponent);
        // statements; 
        break; 
      } 
      default: { 
         componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModuleviewComponent);
         //statements; 
         break; 
      } 
   } 
    const componentRef = viewContainerRef.createComponent<ViewComponent>(componentFactory);

    componentRef.instance.unitSelectionEvent.subscribe(id => this.onUnitSelection(id));

  }

}