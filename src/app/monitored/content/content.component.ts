import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import{ViewComponent, RowElement} from './view.component'
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
  @Output() unitSelectionEvent = new EventEmitter<number>(); tempnum:number=0;
  @ViewChild(ViewUnitsDirective, {static: true}) appViewUnits: ViewUnitsDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  viewClick(){
    this.tempnum=this.tempnum+1;
    console.log(this.tempnum +"  clicked");
    this.unitSelectionEvent.emit(this.tempnum);
  }
  ngOnInit(): void {
    this.LoadView(this.ViewType) ;
  }
  ngOnChanges() {
    this.LoadView(this.ViewType) ;
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values
    
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
     componentRef.instance.data =this.view_DATA;
  }




 view_DATA: RowElement[] = [
  {
    itemName: 'CharmShahr',
    engines:'(2)',
    update:2,
    subunits:[
      {
        itemName: 'unit 1',
        engines:'ready',
        update:2,
        subunits:[],
        alarm:{name:'*WrnServiceTime',Icon:'ECU'}
      },
      {
        itemName: 'unit 20',
        engines:'Shot down',
        update:1,
        subunits:[],
        alarm:{name:'*WrnServiceTime',Icon:'alarm'}
      },
    ],
    alarm:{name:'*Emergency stop', Icon:'sutdown'}
  },
  {
    itemName: 'unit 2',
    engines:'ready',
    update:1,
    subunits:[],
    alarm:{name:'*Emergency stop', Icon:'warning'}
  },
  {
    itemName: 'unit 3',
    engines:'(3)',
    update:3,
    subunits:[],
    alarm:{name:'*WrnServiceTime',Icon:'ECU'}
  }
];
}