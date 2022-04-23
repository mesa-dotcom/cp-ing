import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[compOnlyNCD]',
})
export class OnlyNCDDirective {
  @Input() allowedComma: boolean = true;
  @Input() allowedDash: boolean = false;
  previousValue: string = '';

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
   // const initalValue = this._el.nativeElement.value;

   const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9,]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }

  }
}
