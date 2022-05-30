import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ldestado'
})
export class EstadoPipe implements PipeTransform {
  transform(input: boolean): any {
    return !input ? 'Activo' : 'Inactivo';
  }
}
