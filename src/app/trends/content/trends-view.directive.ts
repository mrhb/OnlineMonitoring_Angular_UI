import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[trendsView]'
})
export class TrendsViewDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
