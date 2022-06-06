import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tabla-previsual-req-plantilla',
  templateUrl: './tabla-previsual-req-plantilla.component.html',
  styleUrls: ['./tabla-previsual-req-plantilla.component.css']
})
export class TablaPrevisualReqPlantillaComponent implements OnInit {
  @Input() datos: any[] = [];
  requerimientos: any[] = [];
  cols: any[] = [
    {field: 'identificador', header: 'Identificador'},
    {field: 'descripcion', header: 'Descripción'},
    {field: 'prioridad', header: 'Prioridad'},
    {field: 'padre', header: 'Padre'},
  ];
  total: number = 0;

  constructor() {

  }

  ngOnInit(): void {
    this.total = this.datos.length;
    this.requerimientos = this.datos;
  }

  cargarMasDatos($event: any) {
    this.requerimientos = this.datos.slice($event.first, ($event.first + $event.rows));
    console.log($event.first);
  }

}
