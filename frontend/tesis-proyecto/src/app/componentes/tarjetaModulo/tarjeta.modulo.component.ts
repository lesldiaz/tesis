import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tarjeta-modulo',
  templateUrl: 'tarjeta.modulo.component.html',
  styleUrls: ['tarjeta.modulo.component.sass']
})
export class TarjetaModuloComponent {
  @Input() nombreImagenModulo: string = '';
  @Input() nombreModulo: string = '';
  @Input() descripcion: string = '';
}
