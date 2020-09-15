import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { SeriesInfo, TrendInfo } from '../trendInfo';
import { TrendsService } from '../trends.service';
import { ChartViewComponent } from './chart-view/chart-view.component';
import { TableViewComponent } from './table-view/table-view.component';
import { TrendsViewDirective } from './trends-view.directive';
import { trendViewComponent } from './trendView.Cmponent';

@Component({
  selector: 'trends-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class TrendsContentComponent implements OnInit {
  series : SeriesInfo[];
  @Input() ViewType: string;
  @ViewChild(TrendsViewDirective, {static: true}) trendsView: TrendsViewDirective;

  constructor(_trendsService:TrendsService,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.series=_trendsService.getSelected();
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
    const viewContainerRef = this.trendsView.viewContainerRef;
     viewContainerRef.clear();

    let componentFactory : any;//this.componentFactoryResolver.resolveComponentFactory(TableviewComponent);
    switch(Type) { 
      case "table": { 
           componentFactory = this.componentFactoryResolver.resolveComponentFactory(TableViewComponent);
        //statements; 
        break; 
      } 
      default: { 
         componentFactory = this.componentFactoryResolver.resolveComponentFactory(ChartViewComponent);
        // statements; 
        break; 
      } 
   } 

   const componentRef = viewContainerRef.createComponent<trendViewComponent>(componentFactory);
    componentRef.instance.data = this.series;
  }
}
