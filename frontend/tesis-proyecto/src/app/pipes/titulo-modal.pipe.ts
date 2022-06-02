import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ldtitulomodal'
})
export class TituloModalPipe implements PipeTransform {
  transform(input: boolean | object): any {
    return !input ? 'Crear' : 'Editar';
  }
}
