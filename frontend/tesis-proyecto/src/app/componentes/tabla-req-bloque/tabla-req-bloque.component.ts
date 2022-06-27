import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { RequerimientoInterface } from 'src/app/constantes/interfaces/requerimiento.interface';

@Component({
  selector: 'app-tabla-req-bloque',
  templateUrl: './tabla-req-bloque.component.html',
  styleUrls: ['./tabla-req-bloque.component.css']
})
export class TablaReqBloqueComponent implements OnInit {
  @Input()
  datos: RequerimientoInterface[]=[];
  selectedRequerimiento: RequerimientoInterface | undefined;
  requerimientos: RequerimientoInterface[]=[];

  @Output()devuelveDatos:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.requerimientos = this.datos;
  }

  onRowSelect(event: any) {
    this.devuelveDatos.emit(event.data);
  }
}
