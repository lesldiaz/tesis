import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ldestadoproyecto'
})
export class EstadoProyectoPipe implements PipeTransform {
  transform(input: string): any {
    if (input === 'F') {
      return 'Completed';
    } else if (input === 'P') {
      return 'Pending';
    } else {
      return 'Started';
    }
  }
}
