import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appViewUnits]'
})
export class ViewUnitsDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
