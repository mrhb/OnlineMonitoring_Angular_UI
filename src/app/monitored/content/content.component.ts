import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input } from '@angular/core';
import{ViewComponent} from './view.component'
import { TableviewComponent } from './tableview/tableview.component';
import { ViewUnitsDirective } from './view-units.directive';
import { IconviewComponent } from './iconview/iconview.component';
import { ModuleviewComponent } from './moduleview/moduleview.component';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() ViewType: string;
  @ViewChild(ViewUnitsDirective, {static: true}) appViewUnits: ViewUnitsDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.LoadView(this.ViewType) ;
  }
  ngOnChanges() {
    this.LoadView(this.ViewType) ;
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values
    
}
  LoadView(Type:string) {
    
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TableviewComponent);
    switch(Type) { 
      case "table": { 
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(TableviewComponent);
        //statements; 
        break; 
      } 
      case "icon": { 
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(IconviewComponent);
        //statements; 
        break; 
      } 
      default: { 
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModuleviewComponent);
         //statements; 
         break; 
      } 
   } 


    const viewContainerRef = this.appViewUnits.viewContainerRef;
    viewContainerRef.clear();

     const componentRef = viewContainerRef.createComponent<ViewComponent>(componentFactory);
     componentRef.instance.data = [];
  }


}
