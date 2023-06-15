import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reversepipe'
})
export class ReversepipePipe implements PipeTransform {

  transform(values: any, ...args: any[]): any {
    if (values) {
      return values.reverse();
    }
  }
}
