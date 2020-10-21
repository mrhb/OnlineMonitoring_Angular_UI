import { Directive, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { IRange } from '../range';

@Directive({
  selector: '[trendsView]'
})
export class TrendsViewDirective {

  @Output() RangesEvent : EventEmitter<IRange> = new EventEmitter<IRange>();
 
  constructor(public viewContainerRef: ViewContainerRef) { }

}
