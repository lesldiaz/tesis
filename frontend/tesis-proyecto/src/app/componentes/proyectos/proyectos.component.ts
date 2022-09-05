import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  migasPan: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.migasPan = [
      {
        label: 'Aplicación',
        routerLink: '/aplicacion'
      },
      {
        label: 'Proyectos'
      }
    ];
  }

}
