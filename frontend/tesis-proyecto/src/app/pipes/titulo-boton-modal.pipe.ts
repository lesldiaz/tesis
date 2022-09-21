import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ldtitulobotonmodal'
})
export class TituloBotonModalPipe implements PipeTransform {
  transform(input: boolean | object): any {
    return !input ? 'Create' : 'Edit';
  }
}
