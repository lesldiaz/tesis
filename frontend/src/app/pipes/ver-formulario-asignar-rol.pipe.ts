import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ldbotonverformasignar'
})
export class VerFormularioAsignarRolPipe implements PipeTransform {
  transform(input: boolean): any {
    return input ? 'Asignar Rol' : 'Ocultar Formulario';
  }
}
