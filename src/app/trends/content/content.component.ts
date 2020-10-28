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
  series : SeriesInfo;
  seriesData:any;
  @Input() ViewType: string;
  @ViewChild(TrendsViewDirective, {static: true}) trendsView: TrendsViewDirective;
  
  addItem(newItem: any) {
    console.log("Parent: "+newItem);
  }
  
  constructor(public _trendsService:TrendsService,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.series=_trendsService.getSelected();
    //this.seriesData=
    this.ReadSeriesData();

   }
   ReadSeriesData(): void {
   this._trendsService.getSeriesData(this.series)
    .subscribe(
      data => {
        this.seriesData = data;
        console.log(data);
        this.LoadView(this.ViewType) ;
      },
      error => {
        console.log(error);
      });

    
  }
  ngOnInit(): void {
    
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

    componentRef.instance.series = this.series;
    componentRef.instance.metricsData = this.seriesData;
    
    componentRef.instance.RangesEvent.subscribe(val => {
      console.log("RangesEvent value: "+val)
      this.series.startDate=val["startTime"];
      this.series.endDate=val["endTime"];
      this.ReadSeriesData();
    });
  
  }
}
