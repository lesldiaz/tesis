import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ldestadoaprobacion'
})
export class EstadoAprobacionPipe implements PipeTransform {
  transform(input: boolean): any {
    return input ? 'Aprobado' : 'Por Aprobar';
  }
}
