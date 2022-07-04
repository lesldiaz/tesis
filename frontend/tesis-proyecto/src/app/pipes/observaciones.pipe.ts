import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ldobservaciones'
})
export class ObservacionesPipe implements PipeTransform {
  transform(input: string): any {
    const stringHTML = input.replace(`.`,'PUNTO')
    return input;
  }
}
