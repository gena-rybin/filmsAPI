import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayArrayAsStringWithComa'
})
export class DisplayArrayAsStringPipe implements PipeTransform {

  transform(value: Array<string>) {
    return value.join(', ');
  }
}
