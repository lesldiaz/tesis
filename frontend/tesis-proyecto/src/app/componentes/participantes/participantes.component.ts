import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {
  migasPan: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.migasPan = [
      {
        label: 'Aplicación',
        routerLink: '/aplicacion'
      },
      {
        label: 'Participantes'
      }
    ];
  }

}
