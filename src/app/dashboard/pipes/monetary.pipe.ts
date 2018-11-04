import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe  } from '@angular/common';

@Pipe({
  name: 'monetary'
})
export class MonetaryPipe extends CurrencyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value /= 100;
    return super.transform(value, args);
  }

}
