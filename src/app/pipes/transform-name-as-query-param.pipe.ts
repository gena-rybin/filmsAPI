import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformNameAsQueryParam'
})
export class TransformNameAsQueryParamPipe implements PipeTransform {

  transform(value: string) {
    return value.split(' ').join('%20');
  }
}
