import {Component, Input, OnInit} from '@angular/core';
import {RequerimientoInterface} from 'src/app/constantes/interfaces/requerimiento.interface';

@Component({
  selector: 'app-refinamiento',
  templateUrl: './refinamiento.component.html',
  styleUrls: ['./refinamiento.component.css']
})
export class RefinamientoComponent implements OnInit {
  @Input() requerimientos: RequerimientoInterface[] = [];
  @Input() tipoRequerimientos: 'J' | 'C' = 'C';
  frozenCols:any[] = [
    {field: 'idRequerimiento', header: 'Identificador'},
    {field: 'descripcion', header: 'Descripción'},
    {field: 'prioridad', header: 'Prioridad'},
    {field: 'requerimientoPadre', header: 'Padre'},
  ];
  cols: any[] = [
    {field: 'resultado', header: 'Correcto'},
    {field: 'resultado', header: 'Apropiado'},
    {field: 'resultado', header: 'Completo'},
    {field: 'resultado', header: 'Verificable'},
    {field: 'resultado', header: 'Factible'},
    {field: 'resultado', header: 'Sin Ambigüedad'},
    {field: 'resultado', header: 'Singular'},
    {field: 'resultado', header: 'Trazable'},
    {field: 'resultado', header: 'Modificable'},
    {field: 'resultado', header: 'Consistente'},
    {field: 'resultado', header: 'Conforme'},
    {field: 'resultado', header: 'Necesario'},
  ];
  constructor() {
  }

  ngOnInit(): void {
  }

}
