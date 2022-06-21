import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ldprioridadreq'
})
export class PrioridadReqPipe implements PipeTransform {
  transform(input: number): any {
    if (input === 1) {
      return 'Baja';
    } else if (input === 2) {
      return 'Media';
    }else if (input === 3) {
      return 'Alta';
    }
  }
}
