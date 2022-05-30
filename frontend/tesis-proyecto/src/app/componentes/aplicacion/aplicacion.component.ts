import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-aplicacion',
  templateUrl: './aplicacion.component.html',
  styleUrls: ['./aplicacion.component.sass']
})
export class AplicacionComponent implements OnInit {
  migasPan: MenuItem[] = [];

  constructor() {
  }

  ngOnInit() {
    this.migasPan = [
      {
        label: 'Aplicación'
      }
    ];
  }

}
