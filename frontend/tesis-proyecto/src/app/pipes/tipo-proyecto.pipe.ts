import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ldtiproyecto'
})
export class TipoProyectoPipe implements PipeTransform {
  transform(input: string): any {
    if (input === 'C') {
      return 'Generico';
    } else if (input === 'J') {
      return 'iPlus';
    }
  }
}
