import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ldprioridadreq'
})
export class PrioridadReqPipe implements PipeTransform {
  transform(input: number): any {
    if (input === 1) {
      return 'Low';
    } else if (input === 2) {
      return 'Medium';
    } else if (input === 3) {
      return 'High';
    }
  }
}
