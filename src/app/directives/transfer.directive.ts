import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTransfer]'
})
export class TransferDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
