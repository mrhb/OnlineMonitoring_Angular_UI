import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { SeriesInfo } from '../trendInfo';
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
  @Input() ViewType: string;
  @ViewChild(TrendsViewDirective, {static: true}) trendsView: TrendsViewDirective;
  
  constructor(
    public _trendsService:TrendsService,
    private componentFactoryResolver: ComponentFactoryResolver
    ) 
    {
  }

  ngOnInit(): void {}
  ngOnChanges() {
    this.LoadView(this.ViewType) ;
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
 viewContainerRef.createComponent<trendViewComponent>(componentFactory);
  }
}
